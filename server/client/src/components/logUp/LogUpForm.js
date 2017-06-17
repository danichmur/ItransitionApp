import React from 'react';
import {Grid,Row,Col} from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import {
  RaisedButton,
  FlatButton,
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import AccessApi from '../../Api/AccessApi';
import './LogUpForm.scss';

export default class LogUpForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      nickName: '',
      fullName: '',
      email: '',
      password:'',
      confirmPassword:'',
      code:'',
    };
  };

  handleInputNickName(e){
    const nickName = e.target.value;
    this.setState({ nickName })
  };

  handleInputFullName(e){
    const fullName = e.target.value;
    this.setState({ fullName })
  };

  handleInputEmail(e){
    const email = e.target.value;
    this.setState({ email })
  };

  handleInputPassword(e) {
    const password = e.target.value;
  	this.setState({ password });
  };

	handleInputConfirmPassword(e) {
    const confirmPassword = e.target.value;
  	this.setState({ confirmPassword});
	};

  handleInputCode(e){
    const code = e.target.value;
    this.setState({ code })
  };

  handleNext() {
   this.setState({
     stepIndex: this.state.stepIndex + 1,
     finished: this.state.stepIndex >= 2,
   });
  };

  handlePrev() {
    const stepIndex = this.state.stepIndex;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleSubmitUser() {
    let user = {
      nickname: this.state.nickName,
      name: this.state.fullName,
      email: this.state.email,
      password: this.state.password,
    }
    ApiQueries.logup(user).then(value => {
      console.log(value);
      if(value[1].status == 406){
        alert(value[0].message);
      } else {
        this.handleNext();
      }
    }).then(value => console.log(value));
  };

  handleSubmitCode() {
    ApiQueries.sendSecretCode(this.state.code, this.state.email)
      .then(this.handleNext());
  }

  finishedLogUp() {
    let user = {
      email: this.state.email,
      password: this.state.password
    }
    ApiQueries.login(user)
   .then(value => {
     localStorage.setItem('token', value.authentication_token);
     this.props.setUser({
       id:value.id,
       name: value.name,
       nickName: value.nickname,
       position: value.position,
     });
     window.location.reload();
   });
  }

  componentWillMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
  };

  renderStepActions(step) {
      const stepIndex = this.state.stepIndex;
      return (

        <div >
        {stepIndex == 2 ? (
          <RaisedButton
            label= 'Finish'
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            type="submit"
            onTouchTap={this.finishedLogUp.bind(this)}
          />
        ):(
          <RaisedButton
            label='Next'
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            type="submit"
          />
        )}
          {step  === 1 && (
            <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              disableTouchRipple={true}
              disableFocusRipple={true}
              onTouchTap={this.handlePrev.bind(this)}
            />
          )}
        </div>
      );
    }

  render() {
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={10} sm={6} md={4} lg={4} >
            <Stepper activeStep={this.state.stepIndex} orientation="vertical">
              <Step>
                <StepLabel>Fill in form</StepLabel>
                <StepContent>
                  <ValidatorForm onSubmit={this.handleSubmitUser.bind(this)}>
                    <TextValidator floatingLabelText="Nick name"
                                   onChange={this.handleInputNickName.bind(this)}
                                   name="nickName"
                                   value={this.state.nickName}
                                   validators={['required']}
                                   errorMessages={['this field is required']} />
                    <TextValidator floatingLabelText="Full name"
                                   onChange={this.handleInputFullName.bind(this)}
                                   name="fullName"
                                   value={this.state.fullName}
                                   validators={['required']}
                                   errorMessages={['this field is required']} />
                    <TextValidator floatingLabelText="Email"
                                   onChange={this.handleInputEmail.bind(this)}
                                   name="email"
                                   value={this.state.email}
                                   validators={['required', 'isEmail']}
                                   errorMessages={['this field is required', 'email is not valid']} />

                    <TextValidator floatingLabelText="Password"
                                   onChange={this.handleInputPassword.bind(this)}
                                   name="password"
                                   type="password"
                                   value={this.state.password}
                                   validators={['required']}
                                   errorMessages={['this field is required']} />
                    <TextValidator floatingLabelText="Repeat password"
                                   onChange={this.handleInputConfirmPassword.bind(this)}
                                   name="confirmPassword"
                                   type="password"
                                   value={this.state.confirmPassword}
                                   validators={['isPasswordMatch', 'required']}
                                   errorMessages={['password mismatch', 'this field is required']} />
                    {this.renderStepActions(0)}
                  </ValidatorForm>
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Confirm yourself</StepLabel>
                <StepContent>
                  <div>
                    <p>Plese, check your email, you should got secret code. Put it in form. </p>
                      <ValidatorForm onSubmit={this.handleSubmitCode.bind(this)}>
                        <TextValidator
                          floatingLabelText="Code"
                          onChange={this.handleInputCode.bind(this)}
                          name="code"
                          value={this.state.code}
                          validators={['required']}
                          errorMessages={['this field is required']}
                        />
                        {this.renderStepActions(1)}
                      </ValidatorForm>
                  </div>
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Get start</StepLabel>
                <StepContent>
                  {this.renderStepActions(2)}
                </StepContent>
              </Step>
            </Stepper>
          </Col>
        </Row>
      </Grid>

    );
  }
}
