
import React from 'react';
import './App.css';
import {Content} from './Content'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component{
  render(){
	  return (
		<div>
			<Router>
			<Content/>
			</Router>
		</div>
	  );
  }
}

export default App;
