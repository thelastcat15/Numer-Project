//// Newton Divided
const x = 40200;
const xi = [0, 80000];
const y = [9.81, 9.5682];

const calNewtonDividedDifference = function (xi, y) {
  const n = xi.length;
  const coefficient = new Array(n).fill(0);
  const divideDiff = new Array(n).fill(0).map(() => new Array(n).fill(0));

  // เริ่มต้นด้วยเก็บ y (f(x))
  for (let i = 0; i < n; i++) {
    divideDiff[i][0] = y[i];
  }

  // คำนวณผลต่างแบ่งส่วน (f[x(i )- x(i-1)])
  for (let j = 1; j < n; j++) {
    for (let i = 0; i < n - j; i++) {
      divideDiff[i][j] =
        (divideDiff[i + 1][j - 1] - divideDiff[i][j - 1]) / (xi[i + j] - xi[i]);
    }
  }

  for (let i = 0; i < n; i++) {
    coefficient[i] = divideDiff[0][i];
  }

  // function คำนวณค่า
  function interpolate(xValue) {
    let result = coefficient[0];
    let term = 1;

    for (let i = 1; i < n; i++) {
      term = xValue - xi[i - 1];
      result += coefficient[i] * term;
    }
    return result;
  }

  return interpolate;
};

const cal = calNewtonDividedDifference(xi, y);
const result = cal(40200);
console.log(result);
