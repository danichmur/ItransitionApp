import React from 'react';
import { TextField }  from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import {Grid,Row,Col} from 'react-flexbox-grid';
import './LogInForm.scss';

export default class LogInForm extends React.Component {
  constructor(props){
    super(props);
    this.errors  = {};
  }
  render() {
    return (
      <Grid fluid>
        <Row center="xs">
          <Col>
            <form>
              <div>
              <h1> Hello guest, please Log in or Log up</h1>
                <TextField floatingLabelText="Email"
                           errorText={this.errors.email} />
              </div>
              <div>
                <TextField floatingLabelText="Password"
                           type="password" errorText=""
                           errorText={this.errors.passwordText} />
              </div>
              <div>
                <TextField floatingLabelText="Confirm password"
                           type="password"
                           errorText={this.errors.confirmPassword} />
              </div>
              <RaisedButton className="primary-button"
                            label="Log In" primary={true}
                            onTouchTap={this.validData.bind(this)} />
              <RaisedButton className="primary-button"
                            label="Log Up" primary={true}
                            onTouchTap={this.validData.bind(this)} />
            </form>
          </Col>
        </Row>
      </Grid>

    );
  }
}
