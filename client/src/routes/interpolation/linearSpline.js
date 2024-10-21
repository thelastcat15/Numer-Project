//// Linear Spline
const xi = [2, 4, 6, 8, 10];
const y = [9.5, 8.0, 10.5, 39.5, 72.5];
const x = 4.5;

const linearSplineInterpolation = (xi, y, x) => {
  let i = 0;
  while (i < xi.length - 1 && xi[i + 1] < x) i++;
  const slope = (y[i + 1] - y[i]) / (xi[i + 1] - xi[i]);

  return slope * (x - xi[i]) + y[i];
};

const result = linearSplineInterpolation(xi, y, x);
console.log(result);
