import React from 'react';
import WebcamFeed from '../components/WebcamFeed';
import DetectedObjects from '../components/DetectedObjects';

const Main = () => {
    return (
        <div className="bg-black text-white min-h-screen flex items-center justify-center">
            {/* <h1 className='font-bold text-center text-4xl text-red-200'>Object Detection for Visually Impaired</h1> */}
            <div className="flex flex-col md:flex-row md:space-x-12 p-6">
                <div className="flex justify-center md:justify-start">
                    <WebcamFeed className="max-w-full border-2 border-yellow-500 rounded-lg"/>
                </div>
                <div className="mt-10 md:mt-0 flex flex-col items-center">
                    <h1 className="text-center text-3xl font-bold mb-4">Detected Objects:</h1>
                    <DetectedObjects />
                    
                </div>
            </div>
        </div>
    );
}

export default Main;
