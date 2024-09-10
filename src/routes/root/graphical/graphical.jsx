import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js';
import KaTeXComponent from "@components/Katex"
import ToggleForm from './toggleForm';

function graphical() {
  const [myX, setX] = useState([0, 1, 2])
  const [myY, setY] = useState([-18, -9, 0])
  const [katexText, setKatexText] = useState('...');

  useEffect(() => {
    console.log("myX:", myX);
    console.log("myY:", myY);
  }, [myX, myY]);

  return (
    <>
      <div className="w-[90%] max-w-6xl mx-auto mt-[8rem] mb-[3.5rem] flex flex-col space-y-4">
        <div className="ml-5 sans font-bold leading-normal container">
          <p className='text-3xl'>Root of Equation</p>
          <p className='text-xl text-[#7A76FF] mt-1'>Graphical Methods</p>
        </div>
        <KaTeXComponent expression={'f(x) = ' + katexText} />

        <div className="container">
          <Plot
            data={[
              {
                x: myX,
                y: myY,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {
                  color: '#7dc5ff',
                  size: 8,
                },
                line: {
                  color: '#7a76ff',
                  width: 2,
                  simplify: false
                },
              }
            ]}
            layout={{
              xaxis: {
                range: [Math.min(myX)-1, Math.max(myX)+1],
                tickfont: {
                  color: 'white',
                },
                gridcolor: '#3a3a3a',
                zerolinecolor: 'white',
              },
              yaxis: {
                range: [Math.min(myY)-1, Math.max(myY)+1],
                tickfont: {
                  color: 'white',
                },
                gridcolor: '#3a3a3a',
                zerolinecolor: 'white',
              },
              dragmode: 'pan',
              plot_bgcolor: 'black',
              paper_bgcolor: 'transparent',
              hoverlabel: {
                font: {
                  color: 'white',
                },
              },
              margin: {
                l: 25,
                r: 20,
                t: 20,
                b: 20,
              },
            }}
            config={{
              scrollZoom: true,
              displayModeBar: false
            }}
            style={{ width: '100%', height: '60vh' }}
          />
        </div>
      </div>
      <ToggleForm
        setKatex={setKatexText}
        setX={setX}
        setY={setY}
      />
    </>
  )
}

export default graphical