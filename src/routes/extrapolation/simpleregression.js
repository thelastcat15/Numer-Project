//// simple regression
const xi = [10, 15, 20, 30, 40, 50, 60, 70, 80];
const y = [5, 9, 15, 18, 22, 30, 35, 38, 43];
const x = 65;
const m = 2;

const simpleRegression = (xi, y, x, m = 1) => {
  const n = xi.length;
  const len = m + 1;
  const matA = Array(len)
    .fill(0)
    .map(() => Array(len).fill(0));
  const matB = Array(len).fill(0);

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      let sumAi = 0;
      if (j === 0 && i === 0) {
        matA[i][j] = n;
      } else {
        for (let k = 0; k < n; k++) {
          sumAi += Math.pow(xi[k], i + j);
        }
        matA[i][j] = sumAi;
        console.log("sumAi", sumAi);
      }
    }

    let sumBi = 0;
    if (i === 0) {
      for (let k = 0; k < n; k++) {
        sumBi += y[k];
      }
      matB[i] = sumBi;
    } else {
      for (let k = 0; k < n; k++) {
        sumBi += Math.pow(xi[k], i) * y[k];
      }
      matB[i] = sumBi;
      console.log("sumBi", sumBi);
    }
  }

  const a = gaussJordan(matA, matB);
  console.log(a);
  let result = a[0];
  for (let i = 1; i < len; i++) {
    result += a[i] * Math.pow(x, i);
  }
  return result;
};

const gaussJordan = function (A, B) {
  let ratio;
  let n = A.length;

  // forward elimination
  for (let i = 0; i < n; i++) {
    if (A[i][i] === 0) {
      console.log("Error divide by zero");
      break;
    }

    for (let j = i + 1; j < n; j++) {
      ratio = A[j][i] / A[i][i];
      for (let k = i; k < n; k++) {
        A[j][k] -= ratio * A[i][k];
      }
      B[j] -= ratio * B[i];
    }
  }

  // Backward Elimination
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      ratio = A[j][i] / A[i][i];
      for (let k = i; k < n; k++) {
        A[j][k] -= ratio * A[i][k];
      }
      B[j] -= ratio * B[i];
    }
  }

  // Make the diagonal 1
  for (let i = 0; i < n; i++) {
    const diagVal = A[i][i];
    if (diagVal !== 0) {
      B[i] /= diagVal;
      A[i][i] /= diagVal;
    } else {
      console.log("Error: Division by zero in diagonal");
      return;
    }
  }

  const x = [...B];
  return x;
};

const result = simpleRegression(xi, y, x);
console.log(result);
