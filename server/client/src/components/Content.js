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
import AuthComponents from './AuthComponents';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  IndexRoute,
} from 'react-router-dom';

export default class Content extends React.Component {

  constructor(props) {
		super(props);
		this.drawerState = {open:false};
    this.state = {
      isAuthenticated: true
	   }
   }

  leftButtonTouch() {
		this.setState({open: !this.drawerState.open});
    this.drawerState.open = !this.drawerState.open;
	}

  render() {
		return (
      <Router>
        <div>
          <Header showDrawer={this.leftButtonTouch.bind(this)}/>
          <Route path='/' component={Main} />
          <Route path='/logIn' component={LogInForm} />
          <Route path='/logUp' component={LogUpForm} />
          <Switch>
            <AuthComponents
              drawerState={this.drawerState}
              isAuthenticated={this.state.isAuthenticated} />
          </Switch>
        </div>
      </Router>
    );
  }
}
