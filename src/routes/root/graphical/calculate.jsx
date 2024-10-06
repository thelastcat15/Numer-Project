function myFix(x, dimen) {
    return parseFloat(x.toFixed(dimen));
}

export function cal(start, end, error, func) {
  var newFunc = func.replace(/(\d)(x)/g, "$1*$2");
  newFunc = newFunc.replace(/\(x\)/g, "*x");
  let dimention
  let stepStart = Math.floor(start + end).toString().length-1
  if (stepStart > 0) {
      dimention = stepStart
  }
  const log = {x:[],y:[]}
  while (true) {
      let y, oldY;
      let repeat = false
      const step = Math.pow(10, dimention);
      const dimenAbs = Math.abs(dimention)
      for (let i = start; i <= end; i+=step) {
          i = myFix(i, dimenAbs)
          let temp = eval(newFunc.replace("x", i));
          temp = myFix(temp, dimenAbs > 6 ? 6 : dimenAbs)
          oldY = y || temp
          y = temp
          log["x"].push(i);
          log["y"].push(y);
          if (oldY < 0) {
              if (y >= 0) {
                  if (y > error) {
                      start = i - step + Math.pow(10, --dimention)
                      end = i
                      repeat = true
                      break
                  } else {
                      return log
                  }
              }
          }
      }
      if (!repeat) {
          return log
      }
  }
}