import React, { useState, useEffect, useRef } from 'react'
const { ConwaysGameEngine, defaultRules } = require('@monarchwadia/conways-game-engine');



const Game = ({ speed, rows, cols }) => {


  const [grid, setGrid] = useState();
  const [engine, setEngine] = useState();

  useEffect(() => {
    const engine = new ConwaysGameEngine({
      rowSize: rows || 10,
      colSize: cols || 10
    });

    setEngine(engine);
    setGrid(engine.world);

  }, [rows, cols]);

  return (
    <div className='game'>
      {!grid && <h3>Select grid size</h3>}
      {grid &&
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols || 10}, 20px)`
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
                key={`${i}-${k}`}
                onClick={() => {
                  engine.draw(i, k);
                  console.log(engine.world);
                  setGrid(engine.world);
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[i][k] ? "#61dafb" : undefined,
                  border: "solid 1px #61dafb"
                }}
              />
            )))}
        </div>}
    </div>
  )
      }
      
      export default Game
