import React, { useState, useEffect } from 'react'
import InputForm from './inputForm';

function main() {
  const [X, setX] = useState([])

  const [openTable, setOpenTable] = useState(false)

  return (
    <div className="content">
      <div className="w-[90%] max-w-5xl mx-auto pt-[6rem] mb-[3.5rem] flex flex-col space-y-4 text-center gap-5">
        <div className="sans font-bold leading-normal container">
          {/* <p className='text-3xl'>Root of Equation</p> */}
          <p className='text-3xl'>LU Decomposition Methods</p>
        </div>
        <div className="container">
          {
            openTable && dataGraph && (
              <div className="relative overflow-x-auto overflow-y-auto max-h-[calc(100vh-22rem)] shadow-md sm:rounded-lg no-scrollbar">
                <table className="w-full text-sm text-left text-gray-400">
                  <thead className="text-xs uppercase bg-gray-700 text-gray-400 sticky top-0">
                    <tr>
                      <th scope="col" className="px-6 py-3 w-1/3">
                        Iteration
                      </th>
                      <th scope="col" className="px-6 py-3 w-1/3">
                        X
                      </th>
                      <th scope="col" className="px-6 py-3 w-1/3">
                        Y
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {dataGraph.X.slice(startRow, endRow).map((xValue, index) => ( */}
                    {dataGraph.X.map((xValue, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="px-6 py-4">{index+1}</td>
                        <td className="px-6 py-4">{xValue}</td>
                        <td className="px-6 py-4">{dataGraph.Y[index]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            )
          }
          {
            !openTable && <InputForm X={X} setX={setX} />
          }
        </div>
      </div>
      {/* <div className='fixed bottom-0 right-0'>
        <div
          className={`m-5 p-3.5 bg-black border-2 border-blue-500 cursor-pointer rounded-full`}
          onClick={() => {
            setOpenTable(!openTable);
          }}
        >
          {!openTable && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
            </svg>
          )}
          {openTable && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
            </svg>
          )}
        </div>
      </div> */}
    </div>
  )
}

export default main