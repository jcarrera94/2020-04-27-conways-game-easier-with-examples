import React, { useState } from 'react';
import './App.css';
import Game from './components/game';

function App() {

  const [rows, setRows] = useState();
  const [cols, setCols] = useState();
  const [speed, setSpeed] = useState(1000);

  return (
    <div className="App">
      <header className='header'>
        <h1>Welcome to Conways game of life (Easy version)</h1>
      </header>
      <div className='container'>
        <section className='section-controls'>
          <h2>Format board size</h2>
          <label>
            Rows:
          </label>
          <input
            value={rows}
            placeholder={"default value is 10"}
            onChange={e => setRows(e.target.value)}
          />
          <label>
            Columns:
          </label>
          <input
            value={cols}
            placeholder={"default value is 10"}
            onChange={e => setCols(e.target.value)}
          />
          <label>
            Speed:
          </label>
          <button onClick={() => speed < 101 ? setSpeed(100) : setSpeed(speed - 100)}>speed up</button>
          <button onClick={() => speed > 2500 ? setSpeed(2500) : setSpeed(speed + 100)}>slow down</button>
        </section>
        <section className='section-game'>

        </section>
        <Game rows={rows} cols={cols} speed={speed}/>
      </div>
    </div>
  );
}

export default App;
