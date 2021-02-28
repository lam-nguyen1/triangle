import '@tradeshift/tradeshift-ui';
import '@tradeshift/tradeshift-ui/ts.css';

import '../styles/styles.less';
import Polygon from './dom/polygon';
import { element, removeNode } from './dom/dom';


const sideOne = document.querySelector('#side-one');
const sideTwo = document.querySelector('#side-two');
const sideThree = document.querySelector('#side-three');

const em = document.querySelector('em');

const getCoords = polygonPoints => {
  return polygonPoints.split(' ').map(v => {
    return {
      x: +v.split(',')[0],
      y: +v.split(',')[1],
    };
  });
}

const getDist = (p1, p2) => {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

const isTriangle = (s1, s2, s3) => {
  return s1 + s2 > s3 && s1 + s3 > s2 && s2 + s3 > s1;
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

ts.ui.ready(() => {
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
  const svg1 = element('svg', {width: '500', height: '500'}, [initPolygon])
  let triCont = element('div', { class: 'triangle-container' }, [svg1]);
  em.appendChild(triCont);

  const coords = getCoords(initPolygon.getAttribute('points'));
  const dist1 = getDist(coords[0], coords[1]);
  const dist2 = getDist(coords[0], coords[2]);
  const dist3 = getDist(coords[1], coords[2]);
  let polygon;

  ts.ui.Header.buttons([
    {label: 'Set sides', type: 'ts-primary', onclick: () => {
      const s1 = +sideOne.value;
      const s2 = +sideTwo.value;
      const s3 = +sideThree.value;

      const alpha = s1 * dist1;
      const beta = s2 * dist2;
      const gamma = s3 * dist3;

      const isTri = isTriangle(alpha, beta, gamma);

      if (isTri) {
        removeNode(em, triCont);

        const x1 = 100;
        const y1 = 400;
        const x2 = 100 + alpha;
        const y2 = 400;

        const x = (beta ** 2 - gamma ** 2 + 2 * x1 * alpha + alpha ** 2) / (2 * alpha);
        const y = y1 - Math.sqrt(beta ** 2 - (x - x1) ** 2);
        
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
        alert('No new triangle rendered! Please make sure that the triangle can be constructed by making sure that the sum of two arbitrary sides is greater than the last side.');
      }
    }}
  ]);
});
