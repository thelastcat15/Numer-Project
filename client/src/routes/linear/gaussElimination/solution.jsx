import React from 'react'
import { BlockMath } from 'react-katex';

function Solution({ detMatA, detMatAi, X }) {
  if (X.length === 0) {
    return;
  }
  const detALatex = `\\text{det}(A) = ${detMatA}`;
  const detAiLatex = detMatAi.map((detAi, i) => `\\text{det}(A_{${i + 1}}) = ${detAi}`).join("\\\\");

  const xLatex = detMatAi
    .map(
      (detAi, i) =>
        `x_{${i + 1}} = \\frac{det(A_{${
          i + 1
        }})}{det(A)} = \\frac{${detAi}}{${detMatA}} = ${X[
          i
        ].toFixed(4)}`
    )
    .join("\\\\");

  const solutions =
    ` \\therefore ` +
    X.map((x, i) => `x_{${i + 1}} = ${x.toFixed(4)}`).join(", \\ ");

  return (
    <div className='mt-[3rem] mx-auto shadow-2xl min-h-96 backdrop-blur-md'>
      <div className="flex flex-col items-center space-y-6 p-4">
        <BlockMath math={detALatex} />
        <BlockMath math={detAiLatex} />
        <BlockMath math={xLatex} />
        <BlockMath math={solutions} />
      </div>
    </div>
  );
}

export default Solution