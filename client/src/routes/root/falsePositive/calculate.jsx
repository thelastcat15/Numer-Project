import { evaluate } from "mathjs";

const maxIteration = 200

const calculate = (a, b, tolerance, equation) => {
    a = parseFloat(a);
    b = parseFloat(b);
    tolerance = parseFloat(tolerance);

    const f = (x) => evaluate(equation, { x: x });

    if (f(a) * f(b) > 0) {
        return
    }
    
    let iter = 1;
    const data = {
        C: [],
        Y_C: [],
    };

    const length = b - a + 1;
    data["LineX"] = Array.from({ length }, (_, i) => i + a),
    data["LineY"] = Array.from({ length }, (_, i) => {
        const x = i + a;
        return f(x);
    })

    do {
        const y_a = f(a);
        const y_b = f(b);
        const c = ((a * y_b) - (b * y_a)) / (y_b - y_a);
        const y_c = f(c);

        data["C"].push(c);
        data["Y_C"].push(y_c);

        if (Math.abs(y_c) <= tolerance) {
            return data
        } else {
            if (y_c > 0) {
                b = c;
            } else {
                a = c;
            }
        }
    } while (iter++ <= maxIteration);

    return data
};

export {
    calculate
}

// https://www.youtube.com/watch?v=VN4nUCT4eko