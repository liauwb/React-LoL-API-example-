import React from 'react';
import {withRouter} from "react-router-dom";

class Home extends React.Component{
	constructor(props) {
    super(props);
    this.state = {username: '', region: 'OCE', loading:false};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event){
	const temp = new FormData(event.target)
	event.preventDefault()
	this.setState({loading:true})
	fetch('/search',{method:'POST',body:temp})
		.then(response=>response.json())
		.then(data=>{this.props.updateSummoner(data)})
		.then(()=>{this.props.history.push('/'+this.state.region+'/'+this.state.username)});
	this.state.loading = false;
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
	render(){
		if(this.state.loading){
			return (<div className =  "content"><main><i className="fa fa-cog fa-spin fa-10x" /></main></div>)
		}
	  else return (
		<div>
			<main>
			<div className = "content">
			<form onSubmit = {this.handleSubmit} method = "POST" onClick = {this.disabled = true}>
				Username and region:<br/>
				<input type = "text" name = "username" id = "username" onChange = {this.handleChange}>
				</input><span></span>
				<select id = "region" name = "region" onChange = {this.handleChange}>
					<option value = "OCE">OCE</option>
					<option value = "NA">NA</option>
				</select>
				<span></span>
				<span></span>
				<input type = "submit"></input>
			</form>
			
			
			</div>
			</main>
		</div>
	  );
  }
}


export default withRouter(Home);