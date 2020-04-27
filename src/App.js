import React, { useState } from 'react';
import './App.css';
import Game from './components/game';
import { Dropdown } from 'semantic-ui-react';

const speedOptions = [
  { key: 'slowest', text: 'slowest', value: 2500 },
  { key: 'slower', text: 'slower', value: 1800 },
  { key: 'normal', text: 'normal', value: 1000 },
  { key: 'faster', text: 'faster', value: 500 },
  { key: 'fastest', text: 'fastest', value: 100 },
];

function App() {

  const [rows, setRows] = useState();
  const [cols, setCols] = useState();
  const [speed, setSpeed] = useState(1000);
  const [running, setRunning] = useState(false)

  return (
    <div className="App">
      <header className='header'>
        <h1>Welcome to Conways game of life (Easy version)</h1>
      </header>
      <div className='container'>
        <section className='section-controls'>
          <h2>Game Controls</h2>
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
          <select onChange={e => setSpeed(e.target.value)}>
            {speedOptions.map(opt => (
              <option value={opt.value} selected={opt.value === 1000 ? true : false} key={opt.key}>{opt.text}</option>
            ))}
          </select>
          <label>Play/Pause: </label>
          <button onClick={() => setRunning(!running)}>{running ? 'stop' : 'play'}</button>
        </section>
        <Game rows={rows || 10} cols={cols || 10} speed={speed} running={running} />
      </div>
    </div>
  );
}

export default App;
