import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/man.jpg)` }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-center px-6">
                <h1 className="text-4xl md:text-6xl font-bold text-orange-400 drop-shadow-lg mb-6">
                    Object Detection for Visually Impaired People
                </h1>
                <p className="text-lg md:text-2xl text-white font-medium max-w-2xl drop-shadow-md mb-8">
                    Empowering independence through cutting-edge object detection technology. Click the button below to begin your journey with us!
                </p>
                <Link to="/main">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300">
                        Start
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
