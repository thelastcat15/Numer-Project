import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from 'react-dom/client'

import './css/index.css'

import Nav from "@components/Nav"
import Home from "./routes/Home"
import Test from "./routes/test/main"
import Graphical from './routes/root/graphical/main'
import Bisection from './routes/root/bisection/main'
import FalsePosition from './routes/root/falsePositive/main'
import OnePointIteration from './routes/root/onePointIteration/main'
import NewtonRaphson from './routes/root/newtonRaphson/main'
import Secant from './routes/root/secant/main'
import Cramer from './routes/linear/cramersRule/main'
import GaussElimination from './routes/linear/gaussElimination/main'
import GaussJordan from './routes/linear/gaussJodan/main'
import LUDecomposition from './routes/linear/luDecomposition/main'
import JacobiIteration from './routes/linear/jacobiIteration/main'
import GaussSeidel from './routes/linear/gaussSeidel/main'

const Topics = {
  "Root of Equation": {
    "Graphical Methods": {
      "path": "root/graphical",
      "element": <Graphical />
    },
    "Bisection Methods": {
      "path": "root/bisection",
      "element": <Bisection />
    },
    "False-position Methods": {
      "path": "root/false-position",
      "element": <FalsePosition />
    },
    "One-point Iteration Methods": {
      "path": "root/one-point-iteration",
      "element": <OnePointIteration />
    },
    "Newton-Raphson Methods": {
      "path": "root/newton-raphson",
      "element": <NewtonRaphson />
    },
    "Secant Methods": {
      "path": "root/secant",
      "element": <Secant />
    }
  },
  "Linear Algebra Equation": {
    "Cramer's Rule": {
      "path": "linear-algebra/cramers-rule",
      "element": <Cramer />
    },
    "Guass Elimination": {
      "path": "linear-algebra/gauss-elimination",
      "element": <GaussElimination />
    },
    "Guass Jordan Elimination": {
      "path": "linear-algebra/gauss-jordan",
      "element": <GaussJordan />
    },
    // "Matrix Inversion": {
    //   "path": "linear-algebra/matrix-inversion",
    //   "element": null
    // },
    "LU Decomposition Methods": {
      "path": "linear-algebra/lu-decomposition",
      "element": <LUDecomposition />
    },
    "Jacobi Iteration Methods": {
      "path": "linear-algebra/jacobi-iteration",
      "element": <JacobiIteration />
    },
    "Gauss Seidel Methods": {
      "path": "linear-algebra/gauss-seidel",
      "element": <GaussSeidel />
    },
    // "Conjugate Gradient Methods": {
    //   "path": "linear-algebra/conjugate-gradient",
    //   "element": null
    // }
  },
  // "Interpolation": {
  //   "Newton Divided-differences": {
  //     "path": "interpolation/newton-divided-differences",
  //     "element": null
  //   },
  //   "Lagrange Interpolation": {
  //     "path": "interpolation/lagrange",
  //     "element": null
  //   },
  //   "Spline Interpolation": {
  //     "path": "interpolation/spline",
  //     "element": null
  //   }
  // },
  // "Extrapolation": {
  //   "Simple Regression": {
  //     "path": "extrapolation/simple-regression",
  //     "element": null
  //   },
  //   "Multiple Regression": {
  //     "path": "extrapolation/multiple-regression",
  //     "element": null
  //   }
  // },
  // "Integration": {
  //   "Trapezoidal Rule": {
  //     "path": "integration/trapezoidal",
  //     "element": null
  //   },
  //   "Composite Trapezoidal Rule": {
  //     "path": "integration/composite-trapezoidal",
  //     "element": null
  //   },
  //   "Simpson Rule": {
  //     "path": "integration/simpson",
  //     "element": null
  //   },
  //   "Composite Simpson Rule": {
  //     "path": "integration/composite-simpson",
  //     "element": null
  //   }
  // },
  // "Differentiation": {
  //   "Numerical Differentiation": {
  //     "path": "differentiation/numerical",
  //     "element": null
  //   }
  // }
}

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/test",
    element: <Test />
  }
];

Object.entries(Topics).forEach(([category, subtopics]) => {
  Object.entries(subtopics).forEach(([title, { path, element }]) => {
    if (element) {
      routes.push({
        path: `/${path}`,
        element: element,
      })
    }
  })
})

createRoot(document.getElementById("root")).render(
  <>
    <div className='bg'>
    </div>
    <Nav topics={Topics} />
    <RouterProvider router={createBrowserRouter(routes)} />
  </>
);
