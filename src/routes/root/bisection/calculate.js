export function calculate(start, end, error, newFunc, maxIterations = 100) {
  const log = { x: [], y: [] };

  const FuncEdited = newFunc.replace(/(\d)(x)/g, "$1*$2").replace(/\(x\)/g, "*x");
  const func = new Function('x', `return ${FuncEdited};`);

  if (func(start) * func(end) >= 0) {
    // return { error: "The function must have different signs at points start and end." };
    return
  }

  let mid;
  for (let i = 0; i < maxIterations; i++) {
    mid = (start + end) / 2;
    const fMid = func(mid);
    log.x.push(mid);
    log.y.push(fMid);

    if (Math.abs(fMid) < error) {
      return log;
    }

    if (func(start) * fMid < 0) {
      end = mid;
    } else {
      start = mid;
    }
  }

  return log;
}
