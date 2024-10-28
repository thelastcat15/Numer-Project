import { evaluate } from "mathjs";

const maxIteration = 200

const calculate = (xl, xr, tolerance, equation) => {
    xl = parseFloat(xl);
    xr = parseFloat(xr);
    tolerance = parseFloat(tolerance);

    if (evaluate(equation, { x: xl }) * evaluate(equation, { x: xr }) > 0) {
        return
    }

    let xm,
        fXm,
        fXr,
        ea = 1;
    const data = {
        X: [],
        Y: [],
    };
    let iter = 1;
    do {
        xm = (xl + xr) / 2;
        fXr = evaluate(equation, { x: xr });
        fXm = evaluate(equation, { x: xm });

        data["X"].push(xm);
        data["Y"].push(fXm);

        if (fXm * fXr > 0) {
            ea = Math.abs((xm - xr) / xm);
            xr = xm;
        } else {
            ea = ea = Math.abs((xm - xl) / xm);
            xl = xm;
        }
        iter++;
    } while (iter <= maxIteration && ea > tolerance);

    return data
};

export {
    calculate
}