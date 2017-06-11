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
                <TextField floatingLabelText="Email"
                           errorText={this.errors.email} />
              </div>
              <div>
                <TextField floatingLabelText="Password"
                           type="password" errorText=""
                           errorText={this.errors.passwordText} />
              </div>
              <Row start="xs">
                <RaisedButton
                  className="primary-button "
                  label="Log In" primary={true}
                />
              </Row>
            </form>
          </Col>
        </Row>
      </Grid>

    );
  }
}
