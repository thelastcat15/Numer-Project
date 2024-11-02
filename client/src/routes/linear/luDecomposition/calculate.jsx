const calculate = (n, matA, matB) => {
  const matrixA = matA.map((row) => row.map((val) => parseFloat(val)));
  const matrixB = matB.map((val) => parseFloat(val));

  const L = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));
  const U = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    U[i][i] = 1; // ทแยงของ U เป็น 1

    // Left
    for (let j = i; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < i; k++) {
        sum += L[j][k] * U[k][i];
      }
      L[j][i] = matrixA[j][i] - sum;
    }

    // Right
    for (let j = i + 1; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < i; k++) {
        sum += L[i][k] * U[k][j];
      }
      U[i][j] = (matrixA[i][j] - sum) / L[i][i];
    }
  }

  // LY = B
  const y = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = 0; j < i; j++) {
      sum += L[i][j] * y[j];
    }
    y[i] = (matrixB[i] - sum) / L[i][i];
  }

  // UX = Y
  const xi = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += U[i][j] * xi[j];
    }
    xi[i] = y[i] - sum;
  }

  return {
    matrixL: L,
    matrixU: U,
    matrixY: y,
    X: xi,
  };
}

export {
  calculate
}