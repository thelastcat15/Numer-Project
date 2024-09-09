import React, { useState } from 'react'
import { InlineMath } from 'react-katex';

function ToggleForm({ isToggle, setIsToggle, setKatex }) {
  const [start, setStart] = useState(0.0);
  const [end, setEnd] = useState(10.0);
  const [error, setError] = useState(0.01);
  const [func, setFunc] = useState('');

  const toggleFunc = () => {
    setIsToggle(!isToggle);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'start') {
      setStart(value);
    } else if (id === 'end') {
      setEnd(value);
    } else if (id === 'error') {
      setError(value);
    } else if (id === 'func') {
      setFunc(value);
      setKatex(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(process.env.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start: start,
        end: end,
        error: error,
        func: func,
      }),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <>
      <div
        className={`fixed bottom-0 right-0 m-5 p-3.5 bg-black border-2 border-blue-500 cursor-pointer rounded-full`}
        onClick={toggleFunc}
      >
        <svg
          className="h-8 w-8 text-blue-500"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
          <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
        </svg>
      </div>
      {isToggle && (
        <div className="p-4 w-full max-w-md max-h-full fixed bottom-0 right-0">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl sans font-bold tracking-wide text-gray-900 dark:text-white">
                EDIT
              </h3>
              <button
                type="button"
                onClick={toggleFunc}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-3 md:grid-cols-3">
                  <div>
                    <label htmlFor="start" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Start
                    </label>
                    <input
                      type="text"
                      id="start"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0"
                      value={start}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="end" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Stop
                    </label>
                    <input
                      type="text"
                      id="end"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="10"
                      value={end}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="error" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Error
                    </label>
                    <input
                      type="text"
                      id="error"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0.01"
                      value={error}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="func" className="katex block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <InlineMath>{'f(x)'}</InlineMath>
                  </label>
                  <input
                    type="text"
                    id="func"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="3x+9"
                    value={func}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Calculate
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ToggleForm