import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useFormik } from 'formik';
import '@tradeshift/tradeshift-ui';
import '@tradeshift/tradeshift-ui/ts.css';

import '../styles/styles.less';
import { getLabelStartForSide1, getLabelStart } from './math/label-strategy';
import { isTriangle, getLastPoint } from './math/triangle';
import { getDist } from './math/cartesian';

const INITIAL_TRIANGLE_POINTS = [
  {
    x: 250,
    y: 378940/2703,
  },
  {
    x: 100,
    y: 400,
  },
  {
    x: 400,
    y: 400,
  }
];

const validateTriLen = (errors, values, val) => {
  if (!values[val] && Number.isNaN(values[val])) {
    errors[val] = 'This field is required.';
  } else if (Number.isNaN(values[val])) {
    errors[val] = 'Must be a number';
  } else if (values[val] <= 0) {
    errors[val] = 'Distance must be larger than zero. Example: 3';
  }
}

const validate = values => {
  const errors = {};
  validateTriLen(errors, values, 'sideOne');
  validateTriLen(errors, values, 'sideTwo');
  validateTriLen(errors, values, 'sideThree');

  return errors;
};

const getPoints = trianglePoints => {
  let polygonPoints = '';
  trianglePoints.forEach(point => {
    polygonPoints += `${point.x}, ${point.y} `;
  });
  return polygonPoints;
}

const TriangleSidesForm = () => {
  const [showTriangle, toggle] = useState(false);
  const [trianglePoints, setPoints] = useState(INITIAL_TRIANGLE_POINTS);

  const formik = useFormik({
    initialValues: {
      sideOne: '',
      sideTwo: '',
      sideThree: '',
    },
    validate,
    onSubmit: values => {
      const dist1 = getDist(INITIAL_TRIANGLE_POINTS[0], INITIAL_TRIANGLE_POINTS[1]);
      const dist2 = getDist(INITIAL_TRIANGLE_POINTS[0], INITIAL_TRIANGLE_POINTS[2]);
      const dist3 = getDist(INITIAL_TRIANGLE_POINTS[1], INITIAL_TRIANGLE_POINTS[2]);

      const { sideOne, sideTwo, sideThree } = values;

      const max = Math.max(sideOne, sideTwo, sideThree);

      const alpha = sideOne / max * dist1;
      const beta = sideTwo / max * dist2;
      const gamma = sideThree / max * dist3;

      const isTri = isTriangle(alpha, beta, gamma);

      if (isTri) {
        const x1 = 100;
        const y1 = 400;
        const x2 = 100 + alpha;
        const y2 = 400;

        const { x, y } = getLastPoint(x1, y1, alpha, beta, gamma);

        setPoints([
          {
            x,
            y,
          },
          {
            x: x1,
            y: y1,
          },
          {
            x: x2,
            y: y2,
          }
        ]);
        
        toggle(true);
      } else {
        toggle(false);
        alert('No new triangle rendered! Please make sure that the triangle can be constructed by making sure that the sum of two arbitrary sides is greater than the last side.');
      }
    },
  });

  return (
    <div data-ts="Main">
      <div data-ts="Content">
        <div data-ts="Panel">
          <em>
            <form data-ts="Form" onSubmit={formik.handleSubmit}>
              <fieldset>
                <label htmlFor="sideOne">
                  <span>Enter length of triangle side 1</span>
                  <input 
                    id="sideOne"
                    name="sideOne"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sideOne}
                  />
                </label>
                {
                  formik.touched.sideOne && formik.errors.sideOne ? 
                    <dl className="ts-errors">
                      <dt>{ formik.errors.sideOne }</dt>
                    </dl> :
                    null
                }
              </fieldset>

              <fieldset>
                <label htmlFor="sideTwo">
                  <span>Enter length of triangle side 2</span>
                  <input 
                    id="sideTwo"
                    name="sideTwo"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sideTwo}
                  />
                </label>
                {
                   formik.touched.sideTwo && formik.errors.sideTwo ? 
                    <dl className="ts-errors">
                      <dt>{ formik.errors.sideTwo }</dt>
                    </dl> :
                    null
                }
              </fieldset>

              <fieldset>
                <label htmlFor="sideThree">
                  <span>Enter length of triangle side 3</span>
                  <input 
                    id="sideThree"
                    name="sideThree"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sideThree}
                  />
                </label>
                {
                  formik.touched.sideThree && formik.errors.sideThree ? 
                    <dl className="ts-errors">
                      <dt>{ formik.errors.sideThree }</dt>
                    </dl> :
                    null
                }
              </fieldset>

              <fieldset>
                <button data-ts="Button" className="ts-primary" type="submit">
                  <span>Set sides</span>
                </button>
              </fieldset>
            </form>
            { showTriangle && 
              <div className="triangle-container">
                <svg height="500" width="500">
                    <polygon points={getPoints(trianglePoints)} className="triangle" />
                    <text 
                      x={getLabelStartForSide1(trianglePoints[1], trianglePoints[2], 20).x}
                      y={getLabelStartForSide1(trianglePoints[1], trianglePoints[2], 20).y}
                      textAnchor="middle"
                      fill="black"
                      fontSize="14">
                        Side 1
                    </text>
                    <text 
                      x={getLabelStart(trianglePoints[0], trianglePoints[1], -25).x}
                      y={getLabelStart(trianglePoints[0], trianglePoints[1], -25).y}
                      textAnchor="middle"
                      fill="black"
                      fontSize="14">
                        Side 2
                    </text>
                    <text 
                      x={getLabelStart(trianglePoints[0], trianglePoints[2], 25).x}
                      y={getLabelStart(trianglePoints[0], trianglePoints[2], 25).y}
                      textAnchor="middle"
                      fill="black"
                      fontSize="14">
                        Side 3
                    </text>
                </svg>
              </div>
            }
          </em>
        </div>
      </div>
    </div>
  );
}

const App = () => {
  return <TriangleSidesForm />
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
