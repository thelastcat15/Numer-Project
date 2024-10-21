export function calculate(start, end, error, newFunc, maxIterations = 100) {
  const log = { xl: [], xm: [], xr: [], y: [] };

  const FuncEdited = newFunc.replace(/(\d)(x)/g, "$1*$2").replace(/\(x\)/g, "*x");
  const func = new Function('x', `return ${FuncEdited};`);

  // if (func(start) * func(end) >= 0) {
  //   return
  // }

  let mid;
  for (let i = 0; i < maxIterations; i++) {
    mid = (start + end) / 2.0;
    const fMid = func(mid);
    console.log(start, mid, end, fMid);
    log.xl.push(start);
    log.xm.push(mid);
    log.xr.push(end);
    log.y.push(fMid);

    if (Math.abs(fMid) < error) {
      return log;
    }

    if (func(end) * fMid > 0) {
      end = mid;
    } else {
      start = mid;
    }
  }

  return log;
}
