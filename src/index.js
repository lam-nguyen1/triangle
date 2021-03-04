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

const App = () => {
  return <TriangleSidesForm onRender={handleRender}/>
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
