import { evaluate } from "mathjs";

const maxIteration = 200

const calculate = (a, b, tolerance, equation) => {
    a = parseFloat(a);
    b = parseFloat(b);
    tolerance = parseFloat(tolerance);

    const checkError = (xOld, xNew) => Math.abs((xNew - xOld) / xNew);
    const f = (x) => evaluate(equation, { x: x });

    if (f(a) * f(b) > 0) {
        return
    }

    let xiOld, xiNew;
    let ea = 1;
    let iter = 1;
    const data = [];
    const errors = [];
    const iterations = [];

    do {
        xiNew = (a * f(b) - b * f(a)) / (f(b) - f(a));
        if (f(xiNew) * f(b) < 0) {
            a = xiNew;
        } else {
            b = xiNew;
        }

        if (iter > 1) {
            ea = checkError(xiOld, xiNew);
        }

        xiOld = xiNew;
        iter++;
    } while (iter <= maxIteration && ea > tolerance);

    return {
        iterations
    }
};

export {
    calculate
}

// https://www.youtube.com/watch?v=VN4nUCT4eko