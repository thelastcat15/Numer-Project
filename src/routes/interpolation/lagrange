//// Lagrange
// const x = 40200;
// const xi = [0, 20000, 40000, 60000, 80000];
// const y = [9.81, 9.7487, 9.6879, 9.6879, 9.5682];
const x = 40200;
const xi = [0, 80000];
const y = [9.81, 9.5682];

const calLagrange = function (points, x, xi, y) {
  let result = 0;

  for (let i = 0; i < points; i++) {
    let term = y[i];
    // const divideTerm = xi[i];
    for (j = 0; j < points; j++) {
      if (i != j) {
        term = term * ((xi[j] - x) / (xi[j] - xi[i]));
      }
    }
    result += term;
  }

  return result;
};

const result = calLagrange(2, 40200, xi, y);
console.log(result);
