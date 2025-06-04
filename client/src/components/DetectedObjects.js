import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextToSpeech from './TextToSpeech'; // Import the TextToSpeech component

const DetectedObjects = () => {
    const [detectedObjects, setDetectedObjects] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchDetectedObjects();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const fetchDetectedObjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/detected_objects');
            setDetectedObjects(response.data);
        } catch (error) {
            console.error('Error fetching detected objects:', error);
        }
    };

    return (
        <div>
            <ul>
                {detectedObjects.map((object, index) => (
                    <li className='p-9' key={index}>{object}</li>
                ))}
            </ul>
            <TextToSpeech text={detectedObjects.join(', ')} />
        </div>

    );
};

export default DetectedObjects;