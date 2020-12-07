import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {useState} from 'react'
import {useHistory} from "react-router-dom";
import Home from './Home'
import Aside from './Aside'
import Matches from './Matches'
import MatchDetails from './MatchDetails'

const Content = () => {
  const [summoner,setSummoner] = useState({});
  const [matchdetails,setMatch] = useState({});
  const onformsubmit = (data) => {
	  setSummoner(data.summoner)
	  }
  const getmatchdetails = (data)=> {
	  setMatch(data)
	  
	  console.log(data)
	  console.log(summoner)
  }
  return (
	<div>
	<Aside/>
	<Switch>
		<Route exact path = '/' component = {()=><Home updateSummoner = {onformsubmit}/>} />
		<Route exact path = "/:region/:username" component = {()=><Matches summoner = {summoner} getdetails = {getmatchdetails}/>}/>
		<Route path = "/:region/:username/match/:id" component = {()=><MatchDetails summoner = {summoner} details = {matchdetails}/>}/>
	</Switch>
	
	</div>
  );
};
export {Content};