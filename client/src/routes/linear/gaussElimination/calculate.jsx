import { evaluate } from "mathjs";
import { det } from "mathjs";

const maxIteration = 200

const calculate = (n, matA, matB) => {
  const { n, matA, matB } = formData;
  const matrixA = matA.map((row) => row.map((val) => parseFloat(val, 10)));
  const matrixB = matB.map((val) => parseFloat(val));
  let ratio;

  // Forward Elimination
  for (let i = 0; i < n; i++) {
    if (matrixA[i][i] === 0) {
      alert("Error: Divide by zero");
      break;
    }

    for (let j = i + 1; j < n; j++) {
      ratio = matrixA[j][i] / matrixA[i][i];
      for (let k = i; k < n; k++) {
        matrixA[j][k] -= ratio * matrixA[i][k];
      }
      matrixB[j] -= ratio * matrixB[i];
    }
  }

  // Back substitution
  const xi = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    xi[i] = matrixB[i];
    for (let j = i + 1; j < n; j++) {
      xi[i] -= matrixA[i][j] * xi[j];
    }
    xi[i] /= matrixA[i][i];
  }
  return {
    matrixA: matrixA,
    matrixB: matrixB,
    X: xi,
  };
}

export {
    calculate
}