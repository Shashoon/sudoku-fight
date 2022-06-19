import React from 'react';
import { useEffect, useState } from 'react';
import './Timer.css';

const Timer = ({ currTime }) => {
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let timeInterval;

        if (isRunning) {
            timeInterval = setInterval(() => {
                //setTime((prevTime) => prevTime + 1000);
            }, 1000);
        } else if (!isRunning) {
            clearInterval(timeInterval);
        }

        return () => clearInterval(timeInterval);
    }, [isRunning]);

    return (<div></div>);
}

export default Timer;
