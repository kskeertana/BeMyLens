import React, { useState, useEffect } from 'react';
import { Slider } from '@mui/material';
import { Select, MenuItem } from "@material-tailwind/react";

const TextToSpeech = ({ text }) => {
    const [pitch, setPitch] = useState(1);
    const [rate, setRate] = useState(1);
    const [volume, setVolume] = useState(1);
    const [voice, setVoice] = useState(null);
    const [voices, setVoices] = useState([]);

    const synth = window.speechSynthesis;

    useEffect(() => {
        const getVoices = () => {
            setVoices(synth.getVoices());
        };

        getVoices();
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = getVoices;
        }
    }, [synth]);

    useEffect(() => {
        speak(); // Automatically speak when text changes
    }, [text, pitch, rate, volume, voice]);

    const speak = () => {
        if (synth.speaking) {
            synth.cancel(); // Cancel current speech if already speaking
        }

        if (text !== '') {
            const utterThis = new SpeechSynthesisUtterance(text);
            utterThis.onend = () => {
                console.log('SpeechSynthesisUtterance.onend');
            };
            utterThis.onerror = (event) => {
                console.error('SpeechSynthesisUtterance.onerror', event);
            };

            utterThis.pitch = pitch;
            utterThis.rate = rate;
            utterThis.volume = volume;
            if (voice) {
                utterThis.voice = voice;
            }

            synth.speak(utterThis);
        }
    };



    return (
        <div className='space-y-10 p-10'>

            <div>
                <label>
                    Pitch:
                    <Slider
                        min={0}
                        max={2}
                        step={0.1}
                        value={pitch}
                        onChange={(e) => setPitch(e.target.value)}
                        sx={{
                            '& .MuiSlider-track': {
                                backgroundColor: 'red', // Customize track color
                            },
                            '& .MuiSlider-thumb': {
                                backgroundColor: 'white',
                                border: 'black' // Customize thumb color
                            },
                        }}
                    />
                </label>


            </div>
            <div>
                <label>
                    Rate:
                    <Slider

                        min={0.5}
                        max={2}
                        step={0.1}
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        sx={{
                            '& .MuiSlider-track': {
                                backgroundColor: 'red', // Customize track color
                            },
                            '& .MuiSlider-thumb': {
                                backgroundColor: 'white',
                                border: 'black' // Customize thumb color
                            },
                        }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Volume:
                    <Slider

                        min={0}
                        max={1}
                        step={0.1}
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        sx={{
                            '& .MuiSlider-track': {
                                backgroundColor: 'red', // Customize track color
                            },
                            '& .MuiSlider-thumb': {
                                backgroundColor: 'white',
                                border: 'black' // Customize thumb color
                            },
                        }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Voice:
                    <select className='text-white bg-black rounded-m ml-3 border border-white p-2' onChange={(e) => setVoice(voices.find(v => v.name === e.target.value))}>
                        {voices.map((voice, index) => (
                            <option key={index} value={voice.name}>
                                {voice.name} ({voice.lang})
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
};

export default TextToSpeech;