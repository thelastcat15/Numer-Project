const matA = [
  [5, 2, 0, 0],
  [2, 5, 2, 0],
  [0, 2, 5, 2],
  [0, 0, 2, 5],
];

const b = [12, 17, 14, 7];

const calGaussSeidel = function (A, B, tolerance) {
  const n = A.length;
  let x = new Array(n).fill(0);
  let xNew = new Array(n).fill(0);

  const MAX_ITER = 100;
  let iterInLoop = 0;
  let maxError;

  do {
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          sum += A[i][j] * xNew[j];
        }
      }
      xNew[i] = (B[i] - sum) / A[i][i];
    }
    maxError = 0;
    for (let i = 0; i < n; i++) {
      const ea = Math.abs((xNew[i] - x[i]) / xNew[i]);
      maxError = Math.max(maxError, ea);
    }
    x = [...xNew];

    iterInLoop++;
  } while (iterInLoop < MAX_ITER && maxError >= tolerance);

  if (iterInLoop >= MAX_ITER) {
    console.log("Gauss-Seidel did not converge within number of iterations.");
  }

  return x;
};

const result = calGaussSeidel(matA, b, 0.000001);
console.log(result);
