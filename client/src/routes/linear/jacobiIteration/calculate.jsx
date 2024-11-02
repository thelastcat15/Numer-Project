const calculate = (n, matA, matB, tolerance) => {
  const matrixA = matA.map((row) => row.map((val) => parseFloat(val)));
  const matrixB = matB.map((val) => parseFloat(val));
  let xi = new Array(n).fill(0);
  let xiNew = new Array(n).fill(0);

  const MAX_ITER = 100;
  let iterInLoop = 0;
  let maxError;
  const toleranceNum = parseFloat(tolerance);

  const tempData = [];
  do {
    iterInLoop++;
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          sum += matrixA[i][j] * xi[j];
        }
      }
      xiNew[i] = (matrixB[i] - sum) / matrixA[i][i];
    }
    maxError = 0;
    for (let i = 0; i < n; i++) {
      const ea = Math.abs((xiNew[i] - xi[i]) / xiNew[i]);
      maxError = Math.max(ea, maxError);
    }

    // update x สำหรับรอบต่อไป
    xi = [...xiNew];
    tempData.push(xi);
  } while (iterInLoop < MAX_ITER && maxError >= toleranceNum);

  return tempData;
}

export {
  calculate
}