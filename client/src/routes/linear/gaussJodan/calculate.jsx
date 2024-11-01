const calculate = (n, matA, matB) => {
  const matrixA = matA.map((row) => row.map((val) => parseFloat(val, 10)));
  const matrixB = matB.map((val) => parseFloat(val, 10));
  let ratio;

  // โดดหน้า
  for (let i = 0; i < n; i++) {
    if (matrixA[i][i] === 0) {
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

  // โดดหลัง
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      ratio = matrixA[j][i] / matrixA[i][i];
      for (let k = i; k < n; k++) {
        matrixA[j][k] -= ratio * matrixA[i][k];
      }
      matrixB[j] -= ratio * matrixB[i];
    }
  }

  // หาค่า X
  for (let i = 0; i < n; i++) {
    const diagVal = matrixA[i][i];
    if (diagVal !== 0) {
      matrixB[i] /= diagVal;
      matrixA[i][i] /= diagVal;
    } else {
      return;
    }
  }

  const xi = [...matrixB];

  return {
    matrixA: matrixA,
    matrixB: matrixB,
    X: xi,
  };
}

export {
  calculate
}