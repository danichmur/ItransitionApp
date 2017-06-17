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
    }
  };

  handleInputEmail(e) {
    const email = e.target.value;
    var user = this.state.user;
    user.email = email;
    this.setState({ user: user })
  };

  handleInputPassword(e) {
    const password = e.target.value;
    var user = this.state.user;
    user.password = password;
    this.setState({ user: user })
  };

  handleSubmit(e) {
     AccessApi.login(this.state.user)
    .then(value => {
      localStorage.setItem('token', value.authentication_token);
      localStorage.setItem('user_id', value.id);
      window.location.reload();
    });
  }

  render() {
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={10} sm={6} md={5} lg={4} >
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
