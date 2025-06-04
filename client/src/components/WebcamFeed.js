import React from 'react';

const WebcamFeed = () => {
    return (
        <div>
            
            <img src="http://localhost:5000/video_feed" alt="Webcam Feed" style={{ width: '100%' }} className='border rounded-xl mt-20 ml-14 border-orange-600'/>
        </div>
    );
};

export default WebcamFeed;