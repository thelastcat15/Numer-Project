//// Jacobi
const matA = [
  [5, 2, 0, 0],
  [2, 5, 2, 0],
  [0, 2, 5, 2],
  [0, 0, 2, 5],
];

const b = [12, 17, 14, 7];

const calJacobi = function (A, B, tolerance) {
  const n = A.length;
  let x = new Array(n).fill(0.0);
  let xNew = new Array(n).fill(0.0);

  const MAX_ITER = 100;
  let iterInLoop = 0;
  let maxError;

  do {
    for (let i = 0; i < n; i++) {
      let sum = 0.0;
      for (j = 0; j < n; j++) {
        if (j !== i) {
          sum += A[i][j] * x[j];
        }
      }
      xNew[i] = (B[i] - sum) / A[i][i];
    }
    maxError = 0;
    for (let i = 0; i < n; i++) {
      const ea = Math.abs((xNew[i] - x[i]) / xNew[i]);
      maxError = Math.max(ea, maxError);
    }

    // update x สำหรับรอบต่อไป
    x = [...xNew];

    iterInLoop++;
  } while (iterInLoop < MAX_ITER && maxError >= tolerance);

  if (iterInLoop >= MAX_ITER) {
    console.log("Jacobi did not converge within number of iterations.");
  }

  return x;
};

const result = calJacobi(matA, b, 0.000001);
console.log(result);
