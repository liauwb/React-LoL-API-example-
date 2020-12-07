import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import {useState} from 'react'
import {useHistory} from "react-router-dom";
import Home from './Home'
import Aside from './Aside'

class MatchDetails extends React.Component{
	constructor(props) {
    super(props);
    this.state = {summoner : null, matches: {}, isloading:false};
  }
  componentWillMount(){
	  console.log(this.props.summoner);
	  this.setState({summoner:this.props.summoner, matches:this.props.details})
	  console.log(this)

  }
	render(){
		return(
		<div>
		<main>
			<div className = "content">
				<div>
				<h2>Blue Team</h2>
				</div> 
				<div style = {{paddingTop:50}}>
				<ul style={{listStyleType:'none'}}>
					{this.state.matches.blueteam.map((participants,index)=>{ 
						return(<div>
							<h3>{participants.name}</h3>
							<img src = {participants.champion}/>
							<br/>
							{participants.items.map((item,index1)=>{return(<img src = {item} />)})}
							
						</div>)
					})}
				</ul>
				</div>
				<div>
				<h2>Red Team</h2>
				</div> 
				<div style = {{paddingTop:50}}>
				<ul style={{listStyleType:'none'}}>
					{this.state.matches.redteam.map((participants,index)=>{ 
						return(<div>
							<h3>{participants.name}</h3>
							{participants.items.map((item,index1)=>{return(<img src = {item} />)})}
						</div>)
					})}
				</ul>
				</div>
			</div>
		</main>
		</div>
		)
	}
	
}


export default withRouter(MatchDetails);