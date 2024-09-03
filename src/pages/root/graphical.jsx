import React from 'react'
import KaTeXComponent from "../../components/Katex"

function graphical() {
  return (
    <>
      <div class="w-[90%] max-w-6xl mx-auto px-10 mt-[3rem] flex flex-col space-y-4">
        
        <div class="sans font-bold leading-normal">
          <h2 className='text-3xl'>Root of Equation</h2>
          <p className='text-xl text-[#7A76FF] mt-1'>Graphical Methods</p>
        </div>
        <KaTeXComponent expression="f(x) = ..." />

        {/* <form class="max-w-sm mx-auto">
          <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a number:</label>
          <input type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
        </form> */}
      </div>
    </>
  )
}

export default graphical