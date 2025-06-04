import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Main from './pages/Main';

import 'tailwindcss/tailwind.css';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main" element={<Main />} />
        </Routes>

    );
}

export default App