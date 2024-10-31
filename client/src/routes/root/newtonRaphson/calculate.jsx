import { evaluate, derivative } from "mathjs";

const maxIteration = 50

const calculate = (xInitial, tolerance, equation) => {
    xInitial = parseFloat(xInitial);
    tolerance = parseFloat(tolerance);
    const equation2 = derivative(equation, "x").toString();

    const f = (x) => evaluate(equation, { x: x });
    const fPrime = (x) => evaluate(equation2, { x: x });
    const checkError = (xOld, xNew) => Math.abs((xNew - xOld) / xNew) * 100;

    if (f(xInitial) === 0) {
        return;
    }

    const data = {
        X: [],
        Y: [],
        LineFX: [],
        LineFY: []
    }

    let iter = 0, ea;
    let xCurr = xInitial, xNext;
    data["X"].push(xCurr);
    data["Y"].push(0);

    do {
        const fPrimeVal = fPrime(xCurr);
        if (fPrimeVal === 0) {
            console.log("f'(x) เป็นศูนย์ที่ x = " + xCurr);
            break;
        }

        let yCurr = f(xCurr);
        xNext = xCurr - (yCurr / fPrime(xCurr));
        ea = checkError(xCurr, xNext);

        data["X"].push(xCurr);
        data["Y"].push(yCurr);
        data["X"].push(xNext);
        data["Y"].push(0);

        xCurr = xNext;
        iter++;
    } while (ea > tolerance && iter < maxIteration)

    
    let min = Math.min(...data["X"]);
    let max = Math.max(...data["X"]);
    let length = (max - min + 1)/10;
    min -= length;
    max += length;

    data["LineFX"] = []
    data["LineFY"] = []
    for (let i = min; i <= max; i += 0.01) {
        data["LineFX"].push(i);
        data["LineFY"].push(f(i));
    }
    return data
};

export {
    calculate
}

// https://www.youtube.com/watch?v=VN4nUCT4eko