import React from 'react';
import {
  IconButton,
  Avatar,
  IconMenu,
  Dialog,
  FlatButton,
  RaisedButton,
  AutoComplete,
  Chip,
  Divider,
  FloatingActionButton,
}  from 'material-ui';
import { Row,Col } from 'react-flexbox-grid';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {Link } from 'react-router-dom';
import ApiQueries from '../../ApiQueries';

export default class AddDiscussionDlg extends React.Component {

  constructor(props) {
    super(props);
    this.styles = {
      errorText: {
        zIndex:1000,
      }
    }
    this.state = {
        name: ''
    }
  };

  handleCloseDlg() {
    this.props.closeDlg();
  }

  handleSubmit() {
    this.props.addDiscussion(this.state.name);
  }

  handleInputDiscussionName(e) {
    const value = e.target.value;
    this.setState({ name: value });
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
            <Row end="xs">
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
              </Row>
            </ValidatorForm>
          </Col>
        </Row>
      </Dialog>
    );
  }
}
