import React from 'react';
import {Grid,Row,Col} from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { RaisedButton,
         FlatButton,
         Step,
         Stepper,
         StepLabel,
         StepContent,
         MenuItem,
         SelectField} from 'material-ui';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './LogUpForm.scss';

export default class LogUpForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      value: null,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputNickName = this.handleInputNickName.bind(this);
    this.handleInputFullName = this.handleInputFullName.bind(this);
    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.handleInputConfirmPassword = this.handleInputConfirmPassword.bind(this);
    this.handleInputCode = this.handleInputCode.bind(this);
  };

  handleChange(event, index, value){
    this.setState({value});
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
    	this.setState({ password: e.target.value });
  };

	handleInputConfirmPassword(e) {
  	this.setState({ confirmPassword: e.target.value });
	};

  handleInputCode(e){
    const code = e.target.value;
        this.setState({ code })
  };

  handleNext() {
   const {stepIndex} = this.state;
   this.setState({
     stepIndex: stepIndex + 1,
     finished: stepIndex >= 2,
   });
 };

 handlePrev() {
   const {stepIndex} = this.state;
   if (stepIndex > 0) {
     this.setState({stepIndex: stepIndex - 1});
   }
 };
renderStepActions(step) {
    const stepIndex = this.state.stepIndex;
    return (
      <div >
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          type="submit"
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }


  handleSubmit() {
    console.log(324);
      this.handleNext();
  };

  componentWillMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
  };

  render() {
    const {finished, stepIndex, email, nickName, fullName, password, confirmPassword, code} = this.state;
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={10} sm={6} md={4} lg={4} >
            <Stepper activeStep={stepIndex} orientation="vertical">
              <Step>
                <StepLabel>Fill in form</StepLabel>
                <StepContent>
                  <ValidatorForm onSubmit={this.handleSubmit.bind(this)}>
                    <TextValidator floatingLabelText="Nick name"
                                   onChange={this.handleInputNickName}
                                   name="nickName"
                                   value={nickName}
                                   validators={['required']}
                                   errorMessages={['this field is required']} />
                    <TextValidator floatingLabelText="Full name"
                                   onChange={this.handleInputFullName}
                                   name="fullName"
                                   value={fullName}
                                   validators={['required']}
                                   errorMessages={['this field is required']} />
                    <TextValidator floatingLabelText="Email"
                                   onChange={this.handleInputEmail}
                                   name="email"
                                   value={email}
                                   validators={['required', 'isEmail']}
                                   errorMessages={['this field is required', 'email is not valid']} />

                    <TextValidator floatingLabelText="Password"
                                   onChange={this.handleInputPassword}
                                   name="password"
                                   type="password"
                                   value={password}
                                   validators={['required']}
                                   errorMessages={['this field is required']} />
                    <TextValidator floatingLabelText="Repeat password"
                                   onChange={this.handleInputConfirmPassword}
                                   name="confirmPassword"
                                   type="password"
                                   value={confirmPassword}
                                   validators={['isPasswordMatch', 'required']}
                                   errorMessages={['password mismatch', 'this field is required']} />
                    <SelectField className="selectField"
                                 floatingLabelText="Choice profession"
                                 value={this.state.value}
                                 onChange={this.handleChange}>
                      <MenuItem value={1} primaryText="Programmer" />
                      <MenuItem value={2} primaryText="Maneger" />
                    </SelectField>
                    {this.renderStepActions(0)}
                  </ValidatorForm>
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Confirm yourself</StepLabel>
                <StepContent>
                  <div>
                    <p>Plese, check your email, you should got secret code. Put it in form. </p>
                    <TextValidator floatingLabelText="Code"
                                   onChange={this.handleInputCode}
                                   name="code"
                                   value={code}
                                   validators={['required', 'isNumber']}
                                   errorMessages={['this field is required', 'is not a number']} />
                  </div>
                  {this.renderStepActions(1)}
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
