import React from 'react';
import { TextField }  from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import {Grid,Row,Col} from 'react-flexbox-grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {Link } from 'react-router-dom';
import './LogInForm.scss';
import AccessApi from '../../Api/AccessApi';

import { Redirect } from 'react-router-dom';

export default class LogInForm extends React.Component {
  constructor(props){
    super(props);
    this.errors  = {};

    this.state = {
      user: {
        email:'',
        password:'',
      },
      redirectTo: false,
      errorStatus: false,
    }
  };

  handleInputEmail(e) {
    const email = e.target.value;
    var user = this.state.user;
    user.email = email;
    this.setState({ user: user, errorStatus: false })
  };

  handleInputPassword(e) {
    const password = e.target.value;
    var user = this.state.user;
    user.password = password;
    this.setState({ user: user, errorStatus: false  })
  };

  handleSubmit(e) {
    AccessApi.login(this.state.user)
      .then(value => {
        if(value == 401) {
          this.setState({ errorStatus: true })
        } else {
          localStorage.setItem('token', value.authentication_token);
          window.location.reload();
        }
      });
  }

  renderError() {
    if (this.state.errorStatus) {
      return(
        <p>Wrong login or password</p>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <Grid fluid>
        {this.renderError()}
        <Row center="xs">
          <Col xs={10} sm={6} md={4} lg={4} >
            <ValidatorForm onSubmit={this.handleSubmit.bind(this)}>
              <Row>
                <TextValidator
                  floatingLabelText="Email"
                  onChange={this.handleInputEmail.bind(this)}
                  name="email"
                  value={this.state.user.email}
                  validators={['required', 'isEmail']}
                  errorMessages={['this field is required', 'email is not valid']}
                />
              </Row>
              <Row>
                <TextValidator
                  floatingLabelText="Password"
                  onChange={this.handleInputPassword.bind(this)}
                  name="password"
                  type="password"
                  value={this.state.user.password}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Row>
              <Row>
                <RaisedButton
                  label="Log in"
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  primary={true}
                  type="submit"
                />
              </Row>
              <Row>
                <p>Dont have a profile? &nbsp;</p>
                <Link to="logUp"><p>Log up</p></Link>
              </Row>
           </ValidatorForm>
          </Col>
        </Row>
      </Grid>

    );
  }
}
