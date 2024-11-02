import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { calculate } from './calculate';
import Solution from './solution'


function ToggleForm({ X, setX }) {
  const [matrixSize, setMatrixSize] = useState(3);
  const [matrixA, setMatrixA] = useState(
    Array(matrixSize).fill("").map(() => Array(matrixSize).fill(""))
  );
  const [matrixB, setMatrixB] = useState(
    Array(matrixSize).fill("")
  );
  const [AnsMatrix, setAnsMatrix] = useState([]);
  const [matrixY, setMatrixY] = useState(Array(matrixSize).fill(0));
  const [matrixL, setMatrixL] = useState(
    Array(matrixSize).fill(0).map(() => Array(matrixSize).fill(0))
  );
  const [matrixU, setMatrixU] = useState(
    Array(matrixSize).fill(0).map(() => Array(matrixSize).fill(0))
  );
  
  const random = (...args) => {
    axios.get(
      `${import.meta.env.VITE_API_URL}/load/linearalgebra/all`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(res => {
      setMatrixSize(res.data.data[0].matA.length)
      setMatrixA(res.data.data[0].matA)
      setMatrixB(res.data.data[0].matB)
    }).catch(err => {
      console.log('Error:', err.message);
    })
  }

  const save = (...args) => {
    axios.post(
      `${import.meta.env.VITE_API_URL}/save/linearalgebra/all`,
      {
        matA: matrixA,
        matB: matrixB,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(res => {
      console.log("Saved")
    }).catch(err => {
      console.log('Error:', err.message);
    })
  }

  const onClickReset = () => {
    setMatrixA(
      Array(matrixSize).fill(Array(matrixSize).fill(""))
    );
    setMatrixB(Array(matrixSize).fill(""));
  };

  const onMatrixAInput = (e, i, j) => {
    const newMatrixA = [...matrixA];
    newMatrixA[i][j] = e.target.value;

    setMatrixA(newMatrixA);
  };

  const onMatrixBInput = (e, i) => {
    const newMatrixB = [...matrixB];
    newMatrixB[i] = e.target.value;
    setMatrixB(newMatrixB);
  }

  const onClickCalculate = () => {
    const result = calculate(matrixSize, matrixA, matrixB);
    if (result) {
      setAnsMatrix(result.X);
      setMatrixL(result.matrixL);
      setMatrixU(result.matrixU);
      setMatrixY(result.matrixY);
    }
  };

  const handleMatrixSizeChange = (newSize) => {
    setMatrixSize(newSize);
    let temp = []
    let differ = Math.abs(newSize-matrixSize);
    matrixA.map((row,indexrow)=>{
      let temp2 = [...row]
      if(newSize < matrixSize){
        for(let i=0;i<differ;i++){
          temp2.pop()
        }
      }else{
        temp2 = temp2.concat(Array(differ).fill(''));
      }
      temp.push(temp2)
    })
    if(newSize > matrixSize){
      temp = temp.concat(Array(differ).fill(Array(newSize).fill('')))
    }else{
      for(let i=0;i<differ;i++){
        temp.pop();
      }
    }
    setMatrixA(temp);
    if (differ == 1) {
      setMatrixB([...matrixB].concat(['']));
    } else {
      setMatrixB([...matrixB].pop());
    }
    setMatrixB(temp);
    setMatrixSize(newSize);
  };

  return (
    <>
      <div className="flex items-end gap-2 mx-auto w-fit">
        <div className="flex flex-col">
          <label>Matrix size ( NxN )</label>
          <div className="relative flex items-center max-w-[8rem] mt-3">
            <button
              type="button"
              id="decrement-button"
              onClick={() => {
                if (matrixSize > 1) {
                  handleMatrixSizeChange(matrixSize-1)
                }
              }}
              data-input-counter-decrement="quantity-input"
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
              <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
              </svg>
            </button>
            <div className="bg-gray-700 border-x-0 border-gray-300 h-11 text-center text-white text-sm block w-full py-2.5">
              {matrixSize}
            </div>
            <button
              type="button"
              id="increment-button"
              onClick={() => {
                if (matrixSize < 20) {
                  handleMatrixSizeChange(matrixSize+1)
                }
              }}
              data-input-counter-increment="quantity-input"
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
              <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
              </svg>
            </button>
          </div>
        </div>
        <button
          className="bg-red-500 text-white p-2 rounded h-[50%]"
          onClick={onClickReset}
        >  
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded mt-2"
          onClick={onClickCalculate}
        >
          Calculate
        </button>
        <button
          type="button"
          onClick={random}
          className="ml-3 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"></path>
          </svg>
        </button>
        <button
          type="button"
          onClick={save}
          className="ml-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"></path>
          </svg>
        </button>
      </div>

      <div className="flex items-center mt-10 justify-center">
        <div className="mx-5">
          <h3 className="text-2xl text-center">[A]</h3>
          <div
            className={`mt-6 grid gap-3`}
            style={{
              gridTemplateColumns: `repeat(${matrixSize}, minmax(0, 1fr))`,
            }}
          >
            {matrixA.map((row, i) =>
              row.map((val, j) => (
                <input
                  key={`A-${i}-${j}`}
                  type="text"
                  name={`A-${i}-${j}`}
                  placeholder={`a${i + 1}${j + 1}`}
                  value={val}
                  onChange={(e) => {
                    onMatrixAInput(e, i, j)
                  }}
                  className="input rounded-lg w-16 h-16 text-center bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
              ))
            )}
          </div>
        </div>
        <div className="mx-5">
          <h3 className="text-2xl text-center">{"{x}"}</h3>
          <div className="mt-6 grid grid-cols-1 gap-3">
            {Array(matrixSize)
              .fill()
              .map((_, i) => (
                <input
                  key={`x-${i}`}
                  type="text"
                  placeholder={`x${i + 1}`}
                  className="input rounded-lg w-16 h-16 text-center bg-gray-600 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  disabled
                />
              ))}
          </div>
        </div>

        <h3 className="text-2xl text-center">=</h3>
        <div className="mx-5">
          <h3 className="text-2xl text-center">{"{B}"}</h3>
          <div className="mt-6 grid grid-cols-1 gap-3">
            {matrixB.map((val, i) => (
              <input
                key={`B-${i}`}
                name={`B-${i}`}
                type="text"
                placeholder={`b${i + 1}`}
                value={val}
                onChange={(e) => {
                  onMatrixBInput(e, i)
                }}
                className="input rounded-lg w-16 h-16 text-center bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
            ))}
          </div>
        </div>
      </div>

      <Solution
        matrixA={matrixA}
        matrixB={matrixB}
        AnsMatrix={AnsMatrix}
        matrixY={matrixY}
        matrixL={matrixL}
        matrixU={matrixU}
      />
    </>
  );
}

export default ToggleForm