import React, { useCallback, useState } from "react";
import { useFormik } from 'formik';

import { validate } from '../form/validation';
import { getLabelStartForSide1, getLabelStart } from '../math/label-strategy';
import { isTriangle, getLastPoint } from '../math/triangle';
import { getAnchoringPoints } from '../math/anchoring-points';
import { translateStartPoints } from '../math/translate-start-points';

const getPoints = trianglePoints => {
  let polygonPoints = '';
  trianglePoints.forEach(point => {
    polygonPoints += `${point.x}, ${point.y} `;
  });
  return polygonPoints;
}

export const TriangleSidesForm = ({ onRender }) => {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const triangleContainer = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const [showTriangle, toggle] = useState(false);
  const [trianglePoints, setPoints] = useState([]);

  const formik = useFormik({
    initialValues: {
      sideOne: '',
      sideTwo: '',
      sideThree: '',
    },
    validate,
    onSubmit: values => {
      const { sideOne, sideTwo, sideThree } = values;
      const max = Math.max(sideOne, sideTwo, sideThree);
      const { p1, p2, dist } = getAnchoringPoints(width, height);

      const alpha = sideOne / max * dist;
      const beta = sideTwo / max * dist;
      const gamma = sideThree / max * dist;

      const isTri = isTriangle(alpha, beta, gamma);

      if (isTri) {
        onRender(values);
        const { start, end } = translateStartPoints(p1, p2, width, height, alpha);
        const { x, y } = getLastPoint(start.x, start.y, alpha, beta, gamma);
        setPoints([{ x, y }, start, end]);
        
        toggle(true);
      } else {
        toggle(false);
        ts.ui.Notification.error(`No new triangle rendered! 
          Please make sure that the triangle can be constructed 
          by making sure that the sum of two arbitrary sides is 
          greater than the last side.`
        );
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
            <div style={{ height: 500 + 'px' }} ref={triangleContainer} className="triangle-container">
              { showTriangle &&
                <svg width="100%" height="100%">
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
              }
            </div>
          </em>
        </div>
      </div>
    </div>
  );
}
