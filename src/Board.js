import React, { useState } from 'react';
import { useEffect } from 'react';
import './Board.css';
import Modal from './Modal';
import Navbar from './Navbar';
const sudoku = require('sudoku');

const Board = () => {



    const [board, setBoard] = useState(Array.from({ length: 9 }, (_, index) => Array.from({ length: 9 }, (__, curr) => null)));
    const [numbers, setNumbers] = useState(Array.from({ length: 9 }, (_, index) => index + 1));
    const [sol, setSolution] = useState(null);
    const [mistakesCount, setMistakesCount] = useState();
    const [chosenNumber, setChosenNumber] = useState(null);
    const [activeCube, setActiveCube] = useState({
        rowIndex: null,
        colIndex: null
    });

    useEffect(() => {
        if (mistakesCount == 3) {
            alert('You loss :(');
            newBoard();
        }

    }, [chosenNumber, sol, board])

    const convertPuzzle = (value) => {
        const temp = Object.values(value);
        const result = [];

        while (temp.length)
            result.push(temp.splice(0, 9));

        return result;
    }

    const solveBoard = () => {
        setBoard(sol);
    }


    const newBoard = () => {
        let tempPuzzle = sudoku.makepuzzle();
        let solution = sudoku.solvepuzzle(tempPuzzle);
        console.log(convertPuzzle(Array(solution)[0].map(curr => curr === null ? null : curr + 1)) + " \n" + convertPuzzle(Array(tempPuzzle)[0].map(curr => curr === null ? null : curr + 1)));

        setBoard(convertPuzzle(Array(tempPuzzle)[0].map(curr => curr === null ? null : curr + 1)));
        setSolution(convertPuzzle(Array(solution)[0].map(curr => curr === null ? null : curr + 1)));
        setChosenNumber(null);
        setMistakesCount(0);
        setActiveCube({ colIndex: null, rowIndex: null });
    }

    const getCubeStyle = (colIndex, rowIndex, currCol) => {
        const between = (curr, min, max) => {
            return curr >= min && curr <= max;
        }

        var boxFlag = between(rowIndex, 3, 5) ? false : true;
        return ((colIndex === 2 || colIndex === 5 ? ' right' : '') +
            (colIndex === 0 ?
                (rowIndex === 0 ? " left  board-left-top-edge" :
                    (rowIndex === 8 ? " left board-left-bot-edge" : ' left')) : '') +
            (colIndex === 8 ?
                (rowIndex === 0 ? " right board-right-top-edge" :
                    (rowIndex === 8 ? " right board-right-bot-edge" : ' right')) : '') +
            (rowIndex === 0 ? ' top' : (rowIndex === 8 ? ' bottom' : "")) +
            (boxFlag ? (between(colIndex, 3, 5) ? ' colored-cube' : '') : (between(colIndex, 0, 2) || between(colIndex, 6, 8) ? ' colored-cube' : '')))
    }

    const isLegal = (colIndex, rowIndex) => {
        let check = sol[rowIndex][colIndex] == chosenNumber ? true : false;
        let cube = document.getElementById(rowIndex + '-' + colIndex).className;
        //document.getElementById(rowIndex + '-' + colIndex).className = !check && !(cube.includes('error')) ? (cube + ' error') : cube;

        if (cube.includes('error'))
            cube.replace(' error', '')

        if (!check) {
            document.getElementById(rowIndex + '-' + colIndex).className += ' error';
            setMistakesCount(mistakesCount + 1)

            if (mistakesCount === 3) {
                alert('You loss');
                newBoard();
            }
        }

        return check;
    }


    return (
        <div className='main'>
            <Navbar newBoard={newBoard} mistakesCount={mistakesCount} />
            <div className='game'>
                <div className='board'>
                    {
                        board.map((currRow, rowIndex) => {
                            return (
                                <div className={'row' + ((rowIndex + 1) % 3 == 0 && rowIndex !== 8 ? ' bottom' : '')} key={rowIndex}>
                                    {currRow.map((currCol, colIndex) =>
                                        <div className={'cube' + getCubeStyle(colIndex, rowIndex, currCol)}
                                            key={rowIndex + '-' + colIndex}
                                            id={rowIndex + '-' + colIndex}
                                            onClick={(e) => {
                                                if (activeCube.colIndex == colIndex && activeCube.rowIndex == rowIndex) {
                                                    setActiveCube({ rowIndex: null, colIndex: null });
                                                } else if (e.target.innerHTML) {
                                                    setChosenNumber(null);
                                                    setActiveCube({ rowIndex: rowIndex, colIndex: colIndex });
                                                } else {
                                                    setActiveCube({ rowIndex: rowIndex, colIndex: colIndex });
                                                }

                                                let arr = board.slice();
                                                //arr[rowIndex][colIndex] = arr[rowIndex][colIndex] != null ? arr[rowIndex][colIndex] :
                                                //(isLegal(colIndex, rowIndex) === false ? null : chosenNumber);
                                                //arr[rowIndex][colIndex] = arr[rowIndex][colIndex] == null ?
                                                //(isLegal(colIndex, rowIndex) == true ? chosenNumber : null) : arr[rowIndex][colIndex];
                                                let check = isLegal(colIndex, rowIndex);
                                                arr[rowIndex][colIndex] = check == true ? chosenNumber : arr[rowIndex][colIndex];
                                                setBoard(arr);
                                            }}
                                        >
                                            {currCol}
                                        </div>
                                    )}
                                </div>)
                        })
                    }
                </div>
                <div className='numbers-deck'>
                    <div className='deck-row'>
                        {numbers.map((curr) => (
                            <div className={'deck-cube' +
                                (chosenNumber == curr ? ' active' : '') +
                                (curr == 1 ? ' left left-edge' : (curr == 9 ? ' right right-edge' : ''))}
                                key={curr}
                                id={curr}
                                onClick={e => e.target.innerHTML == chosenNumber ?
                                    setChosenNumber(null) : setChosenNumber(e.target.innerHTML) || setActiveCube({ colIndex: null, rowIndex: null })} >
                                {curr}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Board;