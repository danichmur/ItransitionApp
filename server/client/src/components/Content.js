import React from 'react';
import Header from './Header';
import Drawer from './leftDrawer/Drawer';
import Main from './main/Main';
import Profile from './profile/Profile';
import LogInForm from './logIn/LogInForm';
import LogUpForm from './logUp/LogUpForm';
import AllProjects from './Projects/AllProjects';
import Project from './SomeProject/Project';
import SomeDiscussion from './Discussion/SomeDiscussion';
import News from './news/News';
import AccessApi from '../Api/AccessApi';

import NoMatch from './NoMatch';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  IndexRoute,
  Redirect
} from 'react-router-dom';

export default class Content extends React.Component {

  constructor(props) {
		super(props);
    this.state = {
      isAuthenticated: null,
      drawerState: false
    }
   }

  leftButtonTouch() {
		this.setState({drawerState: !this.state.drawerState});
	}

  checkStatus() {
     var response = AccessApi.checkSession(localStorage.getItem("token"))
     .then(value => (
       value.status ? (
         this.setState({isAuthenticated: !this.state.isAuthenticated})
       ): (
         this.setState({isAuthenticated: false})
       )
     ))

  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.setState({isAuthenticated: !this.state.isAuthenticated});
  }

  componentDidMount() {
    this.checkStatus();
  }

  renderPublicRoute() {
    return(
      <div>
        <Switch>
          <Route path='/logIn' component={LogInForm} />
          <Route path='/logUp' component={LogUpForm} />
          <Redirect from="*" to='/logIn' />
        </Switch>
      </div>
    );
  }
  renderPrivateRoute() {
    return(
      <div>
        <Drawer
        drawerClose={this.leftButtonTouch.bind(this)}
        drawerState={this.state.drawerState} />
        <Switch>
          <Route path='/profile/:id' component={Profile} />
          <Route path='/allprojects' component={AllProjects} />
          <Route path='/projects/:id' component={Project} />
          <Route path='/projects/:id' component={Project} />
          <Route path='/news' component={News} />
          <Route path='/discussion/:id/project/:id' component={SomeDiscussion} />
          <Redirect from="*" to='/main' />
        </Switch>
      </div>
    );
  }
  renderContent() {
    return(
      <div>
        <Header
          isAuthenticated={this.state.isAuthenticated}
          logOut={this.logOut.bind(this)}
          showDrawer={this.leftButtonTouch.bind(this)}
        />
        <Route path='/main'  component={Main} />
          { this.state.isAuthenticated ? this.renderPrivateRoute() : this.renderPublicRoute() }
      </div>
    )
  }
  render() {
		return (
      <Router>
        { this.state.isAuthenticated != null ? this.renderContent() : null }
      </Router>
    );
  }
}
