import { evaluate } from "mathjs";

const maxIteration = 200

const myFix = (number, decimalPlaces) => {
    return parseFloat(number.toFixed(decimalPlaces));
}

const checkDigitPlace = (num) => {
    if (num === 0) return 1; 
    return Math.floor(Math.log10(Math.abs(num)));
}

const calculate = (start, end, error, func) => {
    start = parseFloat(start);
    end = parseFloat(end);
    error = parseFloat(error);

    if (evaluate(func, { x: start }) * evaluate(func, { x: end }) > 0) {
        return
    }

    let iteration = 0
    const log = {X:[],Y:[]}
    let dimention = checkDigitPlace(start - end)
    while (iteration < maxIteration) {
        let y;
        let repeat = false
        const step = Math.pow(10, dimention);
        const dimenAbs = Math.abs(dimention)
        for (let i = start; i <= end; i+=step) {
            i = myFix(i, dimenAbs)
            let temp = evaluate(func, { x: i });

            temp = myFix(temp, dimenAbs > 6 ? 6 : dimenAbs)
            y = temp
            log["X"].push(i);
            log["Y"].push(y);


            iteration++
            // console.log(i, y)
            // console.log(iteration)

            if (iteration < maxIteration) {
                if (y > 0) {
                    if (Math.abs(y) > error) {
                        dimention--
                        const lastMinusFloat = log["Y"].length - 1 - log["Y"].slice().reverse().findIndex(num => num < 0)
                        start = log["X"][lastMinusFloat] + Math.pow(10, dimention);
                        repeat = true
                        break
                    } else {
                        return log
                    }
                }
            } else {
                return log
            }

        }
        if (!repeat) {
            return log
        }
    }
};

export {
    calculate
}