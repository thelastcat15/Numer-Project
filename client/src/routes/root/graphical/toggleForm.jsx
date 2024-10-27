import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { InlineMath } from 'react-katex';
import { calculate, getResult } from './calculate';


function ToggleForm({ setKatex, setX, setY }) {
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');
  const [isToggle, setIsToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 50, y: 50 });

  const [start, setStart] = useState(0.0);
  const [end, setEnd] = useState(10.0);
  const [error, setError] = useState(0.01);
  const [func, setFunc] = useState('');

  const formRef = useRef(null);
  const dragHandleRef = useRef(null);

  useEffect(() => {
    if (!isDragging) {
      const snapToSide = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const formWidth = formRef.current?.offsetWidth || 400;
        const formHeight = formRef.current?.offsetHeight || 300;

        const x = position.x;
        const y = position.y;
        const minX = -screenWidth + formWidth;
        const minY = -screenHeight + formHeight;

        setPosition({
          x: (x < minX / 2 ? minX : 0),
          y: (y < minY ? minY : (y > 0 ? 0 : y))
        });
      };
      snapToSide();
    }
  }, [isDragging]);

  const handleMouseDown = (e) => {
    if (e.target === dragHandleRef.current || dragHandleRef.current?.contains(e.target)) {
      setIsDragging(true);
      setStartPos({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleTouchStart = (e) => {
    if (e.target === dragHandleRef.current || dragHandleRef.current?.contains(e.target)) {
      setIsDragging(true);
      setStartPos({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
         
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
        
    setPosition({
      x: e.touches[0].clientX - startPos.x,
      y: e.touches[0].clientY - startPos.y
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleDragEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, startPos]);

  const toggleFunc = () => {
    setIsToggle(!isToggle);
  };

  const random = (...args) => {
    setErrorText("")
    setSuccessText("")
    axios.get(
      `${import.meta.env.VITE_API_URL}/load/rootequation/all`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(res => {
      const eq = res.data.equations[0].equation
      setKatex(eq);
      setFunc(eq);
    }).catch(err => {
      if (err.response) {
        setErrorText(`${err.response.data.message}`);
      } else if (err.request) {
        setErrorText('Server Down');
      } else {
        console.log('Error:', err.message);
        // setErrorText(`Error: ${err.message}`);
      }
    })
  }

  const save = (...args) => {
    setErrorText("")
    setSuccessText("")
    axios.post(
      `${import.meta.env.VITE_API_URL}/save/rootequation/all`,
      {
        equation: func
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(res => {
      setSuccessText("Saved")
    }).catch(err => {
      if (err.response) {
        setErrorText(`${err.response.data.message}`);
      } else if (err.request) {
        setErrorText('Server Down');
      } else {
        console.log('Error:', err.message);
        // setErrorText(`Error: ${err.message}`);
      }
    })
  }

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
      const result = calculate(parseFloat(start), parseFloat(end), parseFloat(error), func);
      setX(result.x)
      setY(result.y)
    } catch (error) {
      console.log("Some thing went wrong", error);
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
        </svg>

      </div>
      {isToggle && (
        <div
          ref={formRef}
          className="p-4 w-full max-w-md max-h-full fixed bottom-0 right-0"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            touchAction: 'none',
            zIndex: 1000
          }}
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
            <div 
              ref={dragHandleRef}
              className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 cursor-move"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
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
                        <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"></path>
                        </svg>
                      </button>
                      <p className="text-red-600 text-sm font-bold ml-3">
                        {errorText}
                      </p>
                      <p className="text-green-600 text-sm font-bold ml-3">
                        {successText}
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