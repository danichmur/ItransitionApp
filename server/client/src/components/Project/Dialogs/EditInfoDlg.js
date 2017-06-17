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

export default class EditInfoDlg extends React.Component {
  constructor(props) {
    super(props);
    this.styles = {
      participants: {
        marginTop:10,
        marginBottom:10,
      },
      errorText: {
        zIndex:1000,
      }
    }
    this.state = {
      projectName: '',
      projectDescription: '',
      autoComlete: [],
      chips: [],
      newTag: '',
      errorText:'',
    }

  };

  handleCloseEditInfo() {
    this.state.chips = [];
    this.props.openDlg();
  };

  componentWillReceiveProps() {
    for (var i = 0; i < this.props.projectInfo.tags.length; i++) {
      this.state.chips[i] = this.props.projectInfo.tags[i];
    }
    if (!this.props.open) {
      this.state.autoComlete = [];
      this.setState({
        projectName: this.props.projectInfo.name,
        projectDescription: this.props.projectInfo.description,
      });
      TagsApi.getAllTags(data => {
        data.map(tag => (
          this.state.autoComlete.push(tag.value)
        ))
      })
    } else {
      this.state.chips = [];
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
    let data = {
      name: this.state.projectName,
      description: this.state.projectDescription,
      active:this.props.projectInfo.active,
      tags: this.state.chips
    }
    ProjectApi.updateProject(this.props.projectInfo.id, {
      name: data.name,
      description: data.description,
      active:data.active
    })
    .then(this.props.sendData(data));
    TagsApi.sendNewTags(this.props.projectInfo.id, data.tags);
    this.handleCloseEditInfo();
  };

  addNewTag() {
    if (this.state.newTag != '') {
      this.state.chips.push({
        id: this.state.autoComlete.length ,
        value: this.state.newTag
      });
      this.state.autoComlete.push(this.state.newTag);
      this.setState({
        chips: this.state.chips,
        newTag: ''})
    } else {
      this.setState({errorText: 'input value'})
    }
  };

  deleteTag(id) {
    const tagsToDelete = this.state.chips.map((chip) => chip.id).indexOf(id);
    this.state.chips.splice(tagsToDelete, 1);
    this.setState({chips: this.state.chips});
  };

  render() {

		return (
      <Dialog
        title="Edit project data"
        modal={false}
        autoDetectWindowHeight={true}
        open={this.props.open}
        onRequestClose={this.handleCloseEditInfo.bind(this)}
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
                tags={this.state.chips}
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
                onTouchTap={this.handleCloseEditInfo.bind(this)}
              />
            </ValidatorForm>
          </Col>
        </Row>
      </Dialog>
    );
  }
}