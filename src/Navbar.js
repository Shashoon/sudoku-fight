import React, { useState, useEffect } from 'react';
import './Navbar.css'
import Timer from './Timer';

const Navbar = ({ newBoard, solveBoard, mistakesCount }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timeInterval;

        if (isRunning) {
            timeInterval = setInterval(() => {
                setTime((prevTime) => prevTime + 1000);
            }, 1000);
        } else if (!isRunning) {
            clearInterval(timeInterval);
        }

        return () => clearInterval(timeInterval);
    }, [isRunning]);

    return (
        <div className='navbar'>
            <div className='errors-deck'>
                {Array.from({ length: 3 }, (_, index) => index).map((curr) => {
                    return (
                        <div className={!(mistakesCount < (curr + 1)) ? ' mistake' : ' error-cube'} key={curr}>
                            X
                        </div>
                    );
                })}
            </div>
            {
                time > 0 ?
                    (<div className='timer'>
                        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                    </div>) :
                    ''
            }
            <div className='btn' onClick={() => {
                newBoard();
                if (time > 0) {
                    setTime(0);
                } else {
                    setIsRunning(true)
                }
            }}>
                New Game
            </div>
            <div className='btn' onClick={() => solveBoard()}>
                Solve Game
            </div>
        </div >
    )
}

export default Navbar;