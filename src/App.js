import './App.css';
import Board from './Board';
import Test from './Test';



function App() {

  const newBoard = () => {

  }

  const solveBoard = () => {

  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Sudoku Fight
        </h1>
      </header>
      <div className='app-wrapper' id="reset">
        <Board />
      </div>
    </div>
  );
}

export default App;
