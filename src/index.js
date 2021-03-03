import React from "react";
import ReactDOM from "react-dom";
import '@tradeshift/tradeshift-ui';
import '@tradeshift/tradeshift-ui/ts.css';

import '../styles/styles.less';
import { TriangleSidesForm } from './components/triangleSidesForm';

const handleRender = () => {}

const App = () => {
  return <TriangleSidesForm onRender={handleRender}/>
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
