import { evaluate } from "mathjs";

const maxIteration = 50

const calculate = (xInitial, tolerance, equation) => {
    xInitial = parseFloat(xInitial);
    tolerance = parseFloat(tolerance);

    const checkError = (xOld, xNew) => Math.abs((xNew - xOld) / xNew) * 100;
    const f = (x) => evaluate(equation, { x: x });

    if (f(xInitial) === 0) {
        return;
    }

    const data = {
        X: [],
        Y: [],
        LineFX: [],
        LineFY: []
    }

    let iters = 0;
    let Xold, XNew;
    do {
        Xold = XNew || xInitial;
        XNew = f(Xold);

        data["X"].push(Xold);
        data["Y"].push(XNew);
        data["X"].push(Xold);
        data["Y"].push(Xold);

        if ((checkError(Xold, XNew) < tolerance) || (Math.abs(XNew) >= 1e6)) {
            break;
        }

        Xold = XNew;
        iters++;
    } while (iters < maxIteration)

    
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