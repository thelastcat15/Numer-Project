import { evaluate } from "mathjs";

const maxIteration = 50

const calculate = (X0, X1, tolerance, equation) => {
    X0 = parseFloat(X0);
    X1 = parseFloat(X1);
    tolerance = parseFloat(tolerance);

    const f = (x) => evaluate(equation, { x: x });
    console.log(f(X0))
    const checkError = (X1, X0) => Math.abs((X1 - X0) / X1) * 100;

    const data = {
        X: [],
        Y: [],
        LineFX: [],
        LineFY: []
    }

    let X2;
    let iter = 0, err;
    data["X"].push(X0);
    data["Y"].push(f(X0));
    data["X"].push(X1);
    data["Y"].push(f(X1));


    let Y0 = data["Y"][iter];
    let Y1 = data["Y"][iter+1];
    let Y2;
    do {
        X2 = X1 - (Y1 * (X1 - X0)) / (Y1 - Y0);
        Y2 = f(X2)

        data["X"].push(X2);
        data["Y"].push(Y2);

        err = checkError(X2, X1);

        X0 = X1;
        X1 = X2;
        Y0 = Y1;
        Y1 = Y2;
        iter++;
    } while (err > tolerance && iter < maxIteration)

    
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