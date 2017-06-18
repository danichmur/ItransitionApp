import React from 'react';
import Header from './Header';
import Drawer from './leftDrawer/Drawer';
import Main from './main/Main';
import Profile from './profile/Profile';
import LogInForm from './logIn/LogInForm';
import LogUpForm from './logUp/LogUpForm';
import AllProjects from './AllProjects/AllProjects';
import FewProjects from './FewProjects/FewProjects';
import Project from './Project/Project';
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
      drawerState: false,
      user: ''
    }
    this.user = null;
   }

  leftButtonTouch() {
		this.setState({drawerState: !this.state.drawerState});
	}

  checkStatus() {
     var response = AccessApi.checkSession(localStorage.getItem("token"))
     .then(value => {
       if (value == 401) {
         this.setState({isAuthenticated: false})
       } else {
         this.setState({isAuthenticated: true, user:value})
         localStorage.setItem('userId', value.id);
       }});
  };

  setUser(data) {
    this.user = data;
  };

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.setState({isAuthenticated: !this.state.isAuthenticated});
  };

  componentDidMount() {
    this.checkStatus();
  }

  renderPublicRoute() {
    return(
      <div>
        <Switch>
          <Route path='/main'  component={Main} />
          <Route path='/logIn' component={LogInForm}
          />
          <Route path='/logUp' component={LogUpForm}
          />
          <Redirect from="*" to='/logIn' />
        </Switch>
      </div>
    );
  }
  renderPrivateRoute() {
    return(
      <div>
        <Drawer
          user={this.state.user}
          drawerClose={this.leftButtonTouch.bind(this)}
          drawerState={this.state.drawerState}
        />
        <Switch>
          <Route path='/main'  component={Main} />
          <Route path='/profile/:id' component={Profile} />
          <Route path='/allprojects' component={AllProjects} />
          <Route path='/projects/:id' component={Project} />
          <Route path='/news' component={News} />
          <Route path='/discussion/:id/project/:id' component={SomeDiscussion} />
          <Route path='/tags/:id/allprojects' component={FewProjects} />
          <Redirect from="*" to='/main' />
        </Switch>
      </div>
    );
  }
  renderContent() {
    console.log(this.state.isAuthenticated)
    return(
      <div>
        <Header
          isAuthenticated={this.state.isAuthenticated}
          logOut={this.logOut.bind(this)}
          showDrawer={this.leftButtonTouch.bind(this)}
        />
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
