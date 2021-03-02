import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from 'formik';
import '@tradeshift/tradeshift-ui';
import '@tradeshift/tradeshift-ui/ts.css';

import '../styles/styles.less';
import Polygon from './dom/polygon';
import { element, removeNode } from './dom/dom';
import { isTriangle, getLastPoint } from './math/triangle';
import { getDist } from './math/cartesian';

const validateTriLen = (errors, values, val) => {
  if (!values[val]) {
    errors[val] = 'Required';
  } else if (values[val] > 1 || values[val] < 0) {
    errors[val] = 'Must be between 0 and 1(inclusive). Example: 0.5';
  }
}

const validate = values => {
  const errors = {};
  validateTriLen(errors, values, 'sideOne');
  validateTriLen(errors, values, 'sideTwo');
  validateTriLen(errors, values, 'sideThree');

  return errors;
};

const TriangleSidesForm = () => {
  const formik = useFormik({
    initialValues: {
      sideOne: '',
      sideTwo: '',
      sideThree: '',
    },
    validate,
    onSubmit: values => {
      removeNode(em, triCont);
      const initPolygon = addPolygon(
        {
          x: 250,
          y: 378940/2703,
          x1: 100,
          y1: 400,
          x2: 400,
          y2: 400,
        },
      );
      const svg1 = element('svg', { width: '500', height: '500' }, [initPolygon])
      triCont = element('div', { className: 'triangle-container' }, [svg1]);
      em.appendChild(triCont);
    
      const coords = getCoords(initPolygon.getAttribute('points'));
      const dist1 = getDist(coords[0], coords[1]);
      const dist2 = getDist(coords[0], coords[2]);
      const dist3 = getDist(coords[1], coords[2]);
      let polygon;

      const { sideOne, sideTwo, sideThree } = values;

      const alpha = sideOne * dist1;
      const beta = sideTwo * dist2;
      const gamma = sideThree * dist3;

      const isTri = isTriangle(alpha, beta, gamma);

      if (isTri) {
        removeNode(em, triCont);

        const x1 = 100;
        const y1 = 400;
        const x2 = 100 + alpha;
        const y2 = 400;

        const { x, y } = getLastPoint(x1, y1, alpha, beta, gamma);
        
        polygon = addPolygon(
          {
            x,
            y,
            x1,
            y1,
            x2,
            y2,
          },
        );

        const svg = element('svg', { width: '500', height: '500' }, [polygon])
        triCont = element('div', { class: 'triangle-container' }, [svg]);
        em.appendChild(triCont);

      } else {
        removeNode(em, triCont);
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

const em = document.querySelector('em');

let triCont;

const getCoords = polygonPoints => {
  return polygonPoints.split(' ').map(v => {
    return {
      x: +v.split(',')[0],
      y: +v.split(',')[1],
    };
  });
}

const addPolygon = (points) => {
  return Polygon(
    points.x, 
    points.y,
    points.x1,
    points.y1,
    points.x2,
    points.y2,
  );
}
