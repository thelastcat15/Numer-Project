import React from 'react'
import { BlockMath } from 'react-katex';

function Solution({ AnsMatrixA, AnsMatrixB, X }) {
  if (X.length === 0) {
    return;
  }
  const resultMatrix = AnsMatrixA
    .map((row, i) => [...row, "|", AnsMatrixB[i]].join(" & "))
    .join("\\\\");

  const solutions =
    ` \\therefore ` +
    X.map((x, i) => `x_{${i + 1}} = ${x.toFixed(4)}`).join(", \\ ");

  const latex = `\\begin{bmatrix}
    ${resultMatrix}
    \\end{bmatrix}`;

  return (
    <div className="flex flex-col items-center space-y-6 mt-10">
      <BlockMath math={latex} />
      <BlockMath math={solutions} />
    </div>
  );
}

export default Solution