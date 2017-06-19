import React from 'react';
import {
  Dialog,
  FlatButton,
  RaisedButton,
  AutoComplete,
  Divider,
}  from 'material-ui';
import { Row,Col } from 'react-flexbox-grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Chips from '../../Chips/Chips';
import TagsApi from '../../../Api/TagsApi';
import ProjectApi from '../../../Api/ProjectApi';

export default class AddProjectDlg extends React.Component {
  constructor(props) {
    super(props);
    this.styles = {
      errorText: {
        zIndex:1000,
      }
    }
    this.state = {
      projectName: '',
      projectDescription: '',
      autoComlete: [],
      tags:[],
      newTag: '',
      errorText:'',
    }
  };

  handleCloseDlg() {
    this.props.changeState();
  };

  componentWillReceiveProps() {
    if (!this.props.open) {
      this.state.autoComlete = [];
      TagsApi.getAllTags()
      .then(data => data.map(tag => this.state.autoComlete.push(tag.value)));
    }
  };

  handleInputProjectName(e) {
    const value = e.target.value;
    this.setState({ projectName: value })
  };

  handleInputDescription(e) {
    const value = e.target.value;
    this.setState({ projectDescription: value })
  };

  handleInputTags(e) {
    const value = e;
    this.setState({
      newTag: value ,
      errorText: ''
     })
  };

  handleSubmit() {
    ProjectApi.sendNewProject({
      name: this.state.projectName,
      description: this.state.projectDescription,
      author: this.props.userId,
      active: true,
    }).then(value => {
      TagsApi.sendNewTags(value.id, this.state.tags)
      .then(tags => {
        this.props.sendData({
          id: value.id,
          name: this.state.projectName,
          description: this.state.projectDescription,
          tags: tags,
          active: true,
          created_at: value.created_at,
          user_id: this.props.userId,
        })
        this.handleCloseDlg();
      });
    });
  };

  addNewTag() {
    if (this.state.newTag != '') {
      let tags = !!this.state.tags.find(tag => tag.value == this.state.newTag);
      if (!tags) {
        this.state.tags.push({
          id: this.state.tags.length + 1,
          value: this.state.newTag
        });
        this.setState({
          tags: this.state.tags,
          newTag: ''})
        } else {
          this.setState({errorText: 'already exist'})
        }
    } else {
      this.setState({errorText: 'input value'})
    }
  };

  deleteTag(id) {
    const tagsToDelete = this.state.tags.map((tag) => tag.id).indexOf(id);
    this.state.tags.splice(tagsToDelete, 1);
    this.setState({chips: this.state.tags});
  };

  render() {
		return (
      <Dialog
        title="Edit project data"
        modal={false}
        autoDetectWindowHeight={true}
        open={this.props.state}
        onRequestClose={this.handleCloseDlg.bind(this)}
        autoScrollBodyContent={true}
      >
        <Row>
          <Col xs={12}>
            <ValidatorForm onSubmit={this.handleSubmit.bind(this)}>
              <TextValidator
                floatingLabelText="Project name"
                style={this.styles.errorText}
                onChange={this.handleInputProjectName.bind(this)}
                name="projectName"
                fullWidth={true}
                value={this.state.projectName}
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <Divider />
              <Chips
                deleteTag={this.deleteTag.bind(this)}
                tags={this.state.tags}
                edit={true}
              />
              <Divider />
              <Row bottom="xs">
                <Col xs={6}>
                  <AutoComplete
                    floatingLabelText="Input tag"
                    searchText={this.state.newTag}
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={this.state.autoComlete}
                    errorText={this.state.errorText}
                    onUpdateInput={this.handleInputTags.bind(this)}
                  />
                </Col>
                <Col xs={6}>
                  <RaisedButton
                    label="add tag"
                    primary={true}
                    onTouchTap={this.addNewTag.bind(this)}
                  />
                </Col>
              </Row>
              <TextValidator
                floatingLabelText="Description"
                multiLine={true}
                fullWidth={true}
                style={this.styles.errorText}
                onChange={this.handleInputDescription.bind(this)}
                name="description"
                value={this.state.projectDescription}
                validators={['required']}
                errorMessages={['this field is required']}
              />
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
          </Col>
        </Row>
      </Dialog>
    );
  }
}
