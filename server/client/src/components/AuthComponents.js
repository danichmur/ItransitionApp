import React from 'react';
import Drawer from './leftDrawer/Drawer';
import Profile from './profile/Profile';
import LogInForm from './logIn/LogInForm';
import LogUpForm from './logUp/LogUpForm';
import AllProjects from './Projects/AllProjects';
import Project from './SomeProject/Project';
import SomeDiscussion from './Discussion/SomeDiscussion';
import NoMatch from './NoMatch';
import News from './news/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,

} from 'react-router-dom';

export default class AuthComponents extends React.Component {

  constructor(props){
		super(props);
 }

  renderForAuth() {
    return(
      <div>
        <Drawer drawerState={this.props.drawerState} />
        <Route path='/profile/:id' component={Profile} />
        <Route path='/allprojects' component={AllProjects} />
        <Route path='/projects/:id' component={Project} />
        <Route path='/news' component={News} />
        <Route path='/discussion/:id/project/:id' component={SomeDiscussion} />
        <Route component={NoMatch} />
      </div>
    );
  }

  render() {
		return (
      <div>
        { this.props.isAuthenticated ? this.renderForAuth() : null }
      </div>
    );
  }
}
