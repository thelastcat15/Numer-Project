import React from 'react'
import { BlockMath } from 'react-katex';

function Solution({ matrixA, matrixB, AnsMatrix, matrixY ,matrixL, matrixU}) {
  if (AnsMatrix.length === 0) {
    return;
  }
  const matrixLLatex = matrixL
    .map((row) => row.join(" & "))
    .join("\\\\");
  const matrixULatex = matrixU
    .map((row) => row.join(" & "))
    .join("\\\\");
  const matYLatex = matrixY.map((val) => val.toFixed(4)).join("\\\\");

  // สร้าง vector y แนวตั้ง
  const yVector = matrixY.map((_, i) => `y_{${i + 1}}`).join(" \\\\ ");
  // สร้าง vector x แนวตั้ง
  const xVector = matrixA.map((_, i) => `x_{${i + 1}}`).join(" \\\\ ");

  const matBLatex = matrixB.map((val) => val).join("\\\\");

  // สร้างสมการผลลัพธ์แต่ละตัว
  const ySolutions = matrixY
    .map((y, i) => `y_{${i + 1}} = ${y.toFixed(4)}`)
    .join(", \\ ");
  const solutions =
    ` \\therefore ` +
    AnsMatrix.map((x, i) => `x_{${i + 1}} = ${x.toFixed(4)}`).join(", \\ ");

  const LyxB = `From \\ LY = B \\\\
\\begin{bmatrix}
${matrixLLatex}
\\end{bmatrix}
\\begin{Bmatrix}
${yVector}
\\end{Bmatrix} = \\begin{Bmatrix}
${matBLatex}
\\end{Bmatrix}`;

  const UXxY = `From \\ UX = Y \\\\
\\begin{bmatrix}
${matrixULatex}
\\end{bmatrix}
\\begin{Bmatrix}
${xVector}
\\end{Bmatrix} = \\begin{Bmatrix}
${matYLatex}
\\end{Bmatrix}`;

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <BlockMath math={LyxB} />
      <BlockMath math={ySolutions} />
      <BlockMath math={UXxY} />
      <BlockMath math={solutions} />
    </div>
  );
}

export default Solution