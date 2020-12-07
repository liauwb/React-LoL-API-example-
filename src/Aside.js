import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const Aside = () => {
  return (
	<div className = 'sidebar'>
    <ProSidebar
      breakPoint="md"
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
        <Link to = {'/'}>  BYOL.GG </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
	  
	  <Switch>
        <Route exact path = '/' component = {notFound}/>
		<Route component = {foundPlayer}/>
		
       </Switch>
		
      </SidebarContent>
		
      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
        </div>
      </SidebarFooter>
    </ProSidebar>
	</div>
  );
};

class foundPlayer extends React.Component{
	render(){
		return(
			<Menu iconShape="circle">
			<MenuItem>
				DashBoard
			</MenuItem>
			</Menu>
		)
	}
	
}

class notFound extends React.Component{
	render(){
		return(
			<div>
			</div>
		)
	}
	
}

export default Aside;