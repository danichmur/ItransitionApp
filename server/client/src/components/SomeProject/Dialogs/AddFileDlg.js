import React from 'react';
import {
  Dialog,
  FlatButton,
  RaisedButton,
}  from 'material-ui';
import { Row,Col } from 'react-flexbox-grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import ApiQueries from '../../ApiQueries';

const CLOUDINARY_UPLOAD_PRESET = '531764713868471';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/luxorik/upload';

export default class AddFileDlg extends React.Component {

  constructor(props) {
    super(props);
    this.styles = {
      errorText: {
        zIndex:1000,
      }
    }
    this.state = {
      uploadedFileCloudinaryUrl: ''
    };
  };

  handleCloseDlg() {
    this.props.closeDlg();
  }

  handleSubmit() {
    // var status = ApiQueries.sendNewDiscussion(
    //   this.props.projectId, {
    //     project_id: this.props.projectId,name:this.state.name, id:-1
    //   })
    //   .then(value  => {
    //     console.log(value)
    //     this.props.addDiscussion({id:value.id, name:this.state.name})
    //     this.handleCloseDlg();
    //   });
  }

  handleInputDiscussionName(e) {
    const value = e.target.value;
    this.setState({ name: value });
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);
    console.log(upload)
    upload.end((err, response) => {
      console.error(response);
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }


  render() {
		return (
      <Dialog
        title="Edit project data"
        modal={false}
        autoDetectWindowHeight={true}
        open={this.props.open}
        onRequestClose={this.handleCloseDlg.bind(this)}
        autoScrollBodyContent={true}
      >
        <Row>
          <Col xs={12}>
            <ValidatorForm onSubmit={this.handleSubmit.bind(this)}>
              <TextValidator
                floatingLabelText="Disscussion name"
                style={this.styles.errorText}
                onChange={this.handleInputDiscussionName.bind(this)}
                name="discussionName"
                fullWidth={true}
                value={this.state.name}
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <Row center='xs'>
              {this.state.uploadedFileCloudinaryUrl === '' ? null :
                <div>
                  <p>{this.state.uploadedFile.name}</p>
                  <img src={this.state.uploadedFileCloudinaryUrl} />
                </div>
              }
                <Dropzone
                  multiple={true}
                  accept="image/*"
                  onDrop={this.onImageDrop.bind(this)}>
                  <p>Drop an image or click to select a file to upload.</p>
                </Dropzone>
              </Row>
            <Row end="xs">
              <RaisedButton
                label="Add"
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
              </Row>
            </ValidatorForm>
          </Col>
        </Row>
      </Dialog>
    );
  }
}
