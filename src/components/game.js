import React, { useState, useEffect, useRef, useCallback } from 'react';
import produce from 'immer';
const { ConwaysGameEngine, defaultRules } = require('@monarchwadia/conways-game-engine');

const neighborLocations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const Game = ({ speed, rows, cols, running }) => {


  const [grid, setGrid] = useState();
  const [engine, setEngine] = useState();

  const runningRef = useRef(running);
  runningRef.current = running;

  const speedRef = useRef(speed);
  speedRef.current = speed;

  useEffect(() => {
    const engine = new ConwaysGameEngine({
      rowSize: rows,
      colSize: cols
    });

    setEngine(engine);
    setGrid(engine.world);

  }, [rows, cols]);

  useEffect(() => {
    if (running) {
      runSimulation();
    }
  }, [running]);

  const runSimulation = useCallback(
    () => {
      if (!runningRef.current) {
        return;
      }
      setGrid(grid => {
        return produce(grid, gridCopy => {
          for (let i = 0; i < rows; i++) {
            for (let k = 0; k < cols; k++) {
              let neighbors = 0;
              neighborLocations.forEach(([x, y]) => {
                const newI = i + x;
                const newK = k + y;
                if (newI >= 0 && newI < rows && newK >= 0 && newK < cols) {
                  neighbors += grid[newI][newK];
                }
              });
  
              if (neighbors < 2 || neighbors > 3) {
                gridCopy[i][k] = 0;
              } else if (grid[i][k] === 0 && neighbors === 3) {
                gridCopy[i][k] = 1;
              }
            }
          }
        });
      });
  
      setTimeout(runSimulation, speedRef.current);
    },
    [grid, speed],
  )

  return (
    <div className='game'>
      {!grid && <h3>Select grid size</h3>}
      {grid &&
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 20px)`
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
                key={`${i}-${k}`}
                onClick={() => {
                  const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
                setTimeout(() => {
                  setEngine({ ...engine, world: newGrid });
                  console.log(engine);

                }, 500)
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
