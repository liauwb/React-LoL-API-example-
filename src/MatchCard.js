import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import {useState} from 'react'
import {useHistory} from "react-router-dom";
import {Matches} from './Matches'

class MatchCard extends React.Component{
	constructor(props){
		super(props)
		this.handleclick = this.handleclick.bind(this)
	}
	componentDidMount(){
		console.log(this.props)
	}
	handleclick(event){
		event.preventDefault();
		fetch('/match/'+this.props.overview.id)
		.then(response=>response.json())
		.then(data=>{this.props.getmatchdetails(data)})
		.then(()=>{this.props.history.push('/'+this.props.match.params.region+'/'+this.props.match.params.username+'/match/'+this.props.overview.id)});
	}
	render(){
		return(
			<div style={{padding:5}}>
			<form>
				<div className ={this.props.overview.victory ? "winMatchCard":"loseMatchCard"}>
					<div style = {{float:"left"}}>
						<p>{this.props.overview.id}</p>
						<img src = {this.props.overview.champIcon} height = "100" width = "100"/>
					</div>
					<div style = {{float:"left", paddingLeft:50}}>
						<p>{this.props.overview.mode}</p>
						<p>{this.props.overview.duration}</p>
						<p>{this.props.overview.kda}</p>
						
					</div>
					<input type = "hidden" name = "matchid" value = {this.props.overview.id}/>
					<button style = {{float:"right", marginTop:70}} onClick = {this.handleclick}> Go to match details </button>
				</div>
			</form>
			</div>
		)
	}
}

export default withRouter(MatchCard);