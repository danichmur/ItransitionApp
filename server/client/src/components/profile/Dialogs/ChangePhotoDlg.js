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
import FileApi from '../../../Api/FileApi';


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
      uploadedFileCloudinaryUrl: ''
    };
  };

  handleCloseDlg() {
    this.props.closeDlg();
  }

  handleSubmit() {
    FileApi.sendNewFile(
      this.props.projectId, {
         name: this.state.uploadedFile.name,
         url: this.state.uploadedFileCloudinaryUrl
      })
      .then(value  => {
        console.log(value)
         this.props.addFile({id:value.id, name:this.state.uploadedFile.name, url:this.state.uploadedFileCloudinaryUrl})
         this.handleCloseDlg();
      });
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
              {this.state.uploadedFileCloudinaryUrl === '' ? null : (
                <Row>
                    <img src={this.state.uploadedFileCloudinaryUrl} />
                    <p>{this.state.uploadedFile.name}</p>
                </Row>
              )}
            <Row center='xs'>
              <Dropzone
                multiple={true}
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
                onTouchTap={this.handleSubmit.bind(this)}
              />
              <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleCloseDlg.bind(this)}
              />
              </Row>
          </Col>
        </Row>
      </Dialog>
    );
  }
}
