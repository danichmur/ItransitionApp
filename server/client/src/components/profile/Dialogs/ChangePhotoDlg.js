import React from 'react';
import {
  Dialog,
  FlatButton,
  RaisedButton,
  Divider,
  SelectField,
  MenuItem
}  from 'material-ui';
import { Row,Col } from 'react-flexbox-grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import UsersApi from '../../../Api/UsersApi';

const CLOUDINARY_UPLOAD_PRESET = 'jqeq6aiv';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/luxorik/upload';

export default class ChangePhotoDlg extends React.Component {

  constructor(props) {
    super(props);
    this.styles = {
      errorText: {
        zIndex:1000,
      }
    }
    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
      name: '',
      nickname: '',
      selectValue: ''
    };
    this.user = {

    };
  };

  componentWillReceiveProps() {
    if (!this.props.open) {
      this.state.name = this.props.userInfo.name;
      this.state.nickname = this.props.userInfo.nickname;
      this.state.selectValue = this.props.userInfo.position;
    } 
  };

  handleCloseDlg() {
    this.props.closeDlg();
  };

  handleInputName(e) {
    const value = e.target.value;
    this.setState({name: e.target.value})
  };

  handleInputNickName(e) {
    const value = e.target.value;
    this.setState({nickname: e.target.value})
  };

  handleChangeSelect(e) {
      this.setState({ selectValue: e });
  }


  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  };

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file)
      .end((err, response) => {
        if (err) {
          alert(err);
        }
        if (response.body.secure_url !== '') {
          this.setState({
            uploadedFileCloudinaryUrl: response.body.secure_url
          });
        }
    });
  };

  handleSubmit() {
    let user = {
      name: this.state.name,
      nickname: this.state.nickname,
      photo: this.state.uploadedFileCloudinaryUrl,
      position: this.props.userInfo.position,
    };
    UsersApi.updateUser(this.props.match.params.id, user)
    .then(value => {
      this.props.sendData(user);
      this.handleCloseDlg();
    });
  }

  render() {
		return (
      <Dialog
        title="Edit user profile"
        modal={false}
        autoDetectWindowHeight={true}
        open={this.props.open}
        onRequestClose={this.handleCloseDlg.bind(this)}
        autoScrollBodyContent={true}
      >
      <ValidatorForm onSubmit={this.handleSubmit.bind(this)}>
        <TextValidator
          floatingLabelText="User name"
          style={this.styles.errorText}
          onChange={this.handleInputName.bind(this)}
          name="projectName"
          value={this.state.name}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <Divider />
        <TextValidator
          floatingLabelText="User nickname"
          style={this.styles.errorText}
          onChange={this.handleInputNickName.bind(this)}
          name="description"
          value={this.state.nickname}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <Row>
          <SelectField
            floatingLabelText="Position"
            value={this.state.selectValue}
            onChange={this.handleChangeSelect.bind(this)}
          >
           <MenuItem value={1} primaryText="Manager" />
           <MenuItem value={2} primaryText="Programmer" />
         </SelectField>
         </Row>
      <Row>
        <Col xs={12} sm={6}>
          <Dropzone
            multiple={true}
            onDrop={this.onImageDrop.bind(this)}>
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
        </Col>
        <Col xs={12} sm={6}>
            {this.state.uploadedFileCloudinaryUrl === '' ? null : (
              <img src={this.state.uploadedFileCloudinaryUrl} />
            )}
        </Col>
      </Row>
        <RaisedButton
          label="Edit"
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          type="submit"
        />
        <FlatButton
          label="Close"
          primary={true}
          onTouchTap={this.handleCloseDlg.bind(this)}
        />
      </ValidatorForm>

      </Dialog>
    );
  }
}
