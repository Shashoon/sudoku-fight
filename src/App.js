import './App.css';
import Board from './Board';



function App() {

  const newBoard = () => {

  }

  const solveBoard = () => {

  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='title' id='title'>
          Sudoku Fight
        </div>
      </header>
      <div className='app-wrapper' id="reset">
        <Board />
      </div>
    </div>
  );
}

export default App;
