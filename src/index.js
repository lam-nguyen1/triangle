import React from "react";
import ReactDOM from "react-dom";
import '@tradeshift/tradeshift-ui';
import '@tradeshift/tradeshift-ui/ts.css';

import '../styles/styles.less';
import { TriangleSidesForm } from './components/triangleSidesForm';

const equals = (...args) => {
  for (let i = 1; i < args.length; i++){
     if (args[i] === null || args[i] !== args[i-1]) return false;
  }
  return true;
}

const handleRender = (values) => {
  if (equals(values.sideOne, values.sideTwo, values.sideThree)) {
    ts.ui.Notification.success('You have an equilateral triangle!');
  } else if (equals(values.sideOne, values.sideTwo) || equals(values.sideOne, values.sideThree) || equals(values.sideTwo, values.sideThree)) {
    ts.ui.Notification.success('You have an isosceles triangle!');
  } else {
    ts.ui.Notification.success('You have a scalene triangle!');
  }
}

ts.ui.ready(() => {
	ts.ui.Note({
    icon: 'ts-icon-heart',
    text: `Do note that the lengths of the sides of the triangles are relative to the largest one. 
     It gets normalized during the calculations. For example if you input 
     side 1 = 0.6, side 2 = 0.6 and side 3 = 1, you get an isosceles triangle. 
     The next time you input side 1 = 60, side 2 = 60 and side 3 = 100, you get the same triangle.`,
    onclose: () => {
      ts.ui.Notification.success('The Note is gone...');
    }
  });
});

const App = () => {
  return <TriangleSidesForm onRender={handleRender}/>
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
