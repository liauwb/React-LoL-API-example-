import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import {useState} from 'react'
import {useHistory} from "react-router-dom";
import Home from './Home'
import Aside from './Aside'
import MatchCard from './MatchCard'

class Matches extends React.Component{
	constructor(props) {
    super(props);
    this.state = {summoner : null, matches: [], isloading:false};
	this.loadMore = this.loadMore.bind(this)
  }
  componentWillMount(){
	  console.log(this.props.summoner);
	  this.setState({summoner:this.props.summoner, matches:this.props.summoner.matches})

  }
  
  loadMore(event){
		event.preventDefault();
		this.setState({isloading:true},()=>{
		console.log(this.state.isloading)});
		fetch('/loadmore')
			.then(response=>response.json())
			.then(data=>{this.setState({matches : [...this.state.matches, ...data.matches]})})
			.then(()=>{this.setState({isloading:false})})
  }
  
	render(){
		return(
		<div>
		<main>
			<div className = "content">
				<div style = {{float:'left',fontFamily: 'Maison Neue, sans-serif'}} >
				<p> {this.props.summoner.username} </p>
				<p> Level: {this.props.level} </p>
				</div> 
			<img src={this.props.summoner.icon} width = "100" height = "100" style = {{float:"left",paddingLeft:40}}/>
			<div style = {{paddingTop:100}}>
			<ul style={{listStyleType:'none'}}>
				{this.state.matches.map((match,index)=>{ 
				console.log(match.id);
				return <li><MatchCard overview={match} getmatchdetails = {this.props.getdetails} /> </li>
				})}
			</ul>
			</div>
			{this.state.isloading ? (<button disabled onClick = {this.loadMore}>Please wait..</button>):(<button onClick = {this.loadMore}>Load More</button>)}
			
			</div>
		</main>
		</div>
		)
	}
	
}

export default withRouter(Matches);