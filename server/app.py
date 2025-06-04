from flask import Flask, Response, jsonify
from flask_cors import CORS
import numpy as np
import cv2

app = Flask(__name__)
CORS(app)

confidenceThreshold = 0.5
NMSThreshold = 0.3

modelConfiguration = 'yolov3.cfg'
modelWeights = 'yolov3.weights'
labelsPath = 'coco.names'

labels = open(labelsPath).read().strip().split('\n')

np.random.seed(10)
COLORS = np.random.randint(0, 255, size=(len(labels), 3), dtype="uint8")

net = cv2.dnn.readNetFromDarknet(modelConfiguration, modelWeights)

layer_names = net.getLayerNames()
output_layer_indices = net.getUnconnectedOutLayers()
output_layers = [layer_names[i - 1] for i in output_layer_indices]

video_capture = cv2.VideoCapture(0)

detected_objects = set()

def detect_objects(frame):
    global detected_objects
    (H, W) = frame.shape[:2]

    blob = cv2.dnn.blobFromImage(frame, 1 / 255.0, (416, 416), swapRB=True, crop=False)
    net.setInput(blob)
    layersOutputs = net.forward(output_layers)

    boxes = []
    confidences = []
    classIDs = []

    for output in layersOutputs:
        for detection in output:
            scores = detection[5:]
            classID = np.argmax(scores)
            confidence = scores[classID]
            if confidence > confidenceThreshold:
                box = detection[0:4] * np.array([W, H, W, H])
                (centerX, centerY, width, height) = box.astype('int')
                x = int(centerX - (width / 2))
                y = int(centerY - (height / 2))

                boxes.append([x, y, int(width), int(height)])
                confidences.append(float(confidence))
                classIDs.append(classID)

    detectionNMS = cv2.dnn.NMSBoxes(boxes, confidences, confidenceThreshold, NMSThreshold)
    newly_detected_objects = set()
    if len(detectionNMS) > 0:
        for i in detectionNMS.flatten():
            label = labels[classIDs[i]]
            newly_detected_objects.add(label)
            color = [int(c) for c in COLORS[classIDs[i]]]
            cv2.rectangle(frame, (boxes[i][0], boxes[i][1]), (boxes[i][0] + boxes[i][2], boxes[i][1] + boxes[i][3]), color, 2)
            text = '{}: {:.4f}'.format(label, confidences[i])
            cv2.putText(frame, text, (boxes[i][0], boxes[i][1] - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

    detected_objects.clear()  # Clear the set
    detected_objects.update(newly_detected_objects)

    return frame, newly_detected_objects

def generate_frames():
    while True:
        success, frame = video_capture.read()
        frame = cv2.flip(frame, 1)
        if not success:
            break
        else:
            frame, objects_detected = detect_objects(frame)
            
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/detected_objects')
def get_detected_objects():
    global detected_objects
    return jsonify(list(detected_objects))

if __name__ == '__main__':
    app.run(debug=True)