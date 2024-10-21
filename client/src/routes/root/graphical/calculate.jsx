import React, { useState } from 'react'
import { evaluate } from 'mathjs'

const log = {
    inter: [],
    x: [],
    y: []
}

function getResult() {
    console.log(log)
    return { 
        x: log["x"],
        y: log["y"]
    }
}

function calculate(xl, xr, error, equation) {
    const func = (x) => {
        return evaluate(equation, { x: x });
    };

    let cur = func(xl), old = xl, index = 0
    log["inter"].push(index++)
    log["x"].push(xl)
    log["y"].push(cur)
    
    for (let i = xl + 1; i < xr; i++) {
        if (old * cur < 0) {
            index = i - 2
            break;
        }
        else {
            old = cur;
            cur = func(i);
            if(old*cur >0){
                log["inter"].push(index++)
                log["x"].push(xl)
                log["y"].push(cur)
            }
        }
    }
    while ((Math.abs(func(index)) > error)) {
        index = index + 0.0000001
    }
    log["inter"].push(index++)
    log["x"].push(xl)
    log["y"].push(cur)

    return getResult()
}

export {
    calculate,
    getResult
}