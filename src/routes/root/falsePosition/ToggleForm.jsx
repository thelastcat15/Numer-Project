import axios from 'axios';
import React, { useState } from 'react'
import { InlineMath } from 'react-katex';

function ToggleForm({ setKatex, setX, setY }) {
  const [errorText, setErrorText] = useState('');
  const [isToggle, setIsToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/root/graphical`,
        {
          start: start,
          end: end,
          error: error,
          func: func,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 5000
        }
      );
      setErrorText("");
      setX(response.data.result.x)
      setY(response.data.result.y)
    } catch (error) {
      if (error.response) {
        setErrorText(error.response.data.error);
      } else if (error.request) {
        setErrorText("Server Down")
      } else {
        setErrorText(error.message);
      }
    } finally {
      setIsLoading(false);
    }
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
                {
                  isLoading ?
                  (
                    <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                      <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                      </svg>
                      Loading...
                    </button>
                  ) : (
                    <div className='flex items-center	'>
                      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Calculate
                      </button>
                      <p className="text-red-600 text-sm font-bold ml-3">
                        {errorText}
                      </p>
                    </div>
                  )
                }
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ToggleForm