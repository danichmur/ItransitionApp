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
}  from 'material-ui';
import { Row,Col } from 'react-flexbox-grid';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {Link } from 'react-router-dom';
import Chips from '../ProjectInfo/Chips';

export default class EditInfoDlg extends React.Component {
  constructor(props) {
    super(props);
    this.styles = {
      participants: {
        marginTop:10,
        marginBottom:10,
      }
    }
    this.state = {
      projectName: this.props.projectInfo.name,
      projectDescription: this.props.projectInfo.description,
      autoComlete: [
        "java",
        "C#",
        "Ruby",
        "Python",
      ],
      chips: [],
      newTag: null,
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
    this.props.open ?
      (
        console.log("dont get data"),
        this.state.chips = []
      )
    :
      (
        console.log("get data")
      )

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
    this.setState({ newTag: value })
  };

  handleSubmit() {
    let data = {
      name: this.state.projectName,
      description: this.state.projectDescription,
      tags: this.state.chips,
    }
    this.props.sendData(data);
    this.handleCloseEditInfo();
  };

  addNewTag() {
    this.state.chips.push({ id: this.state.autoComlete.length + 20, value: this.state.newTag});
    this.state.autoComlete.push(this.state.newTag);
    this.setState({chips: this.state.chips})
  };

  deleteTag(id) {
    const tagsToDelete = this.state.chips.map((chip) => chip.id).indexOf(id);
    this.state.chips.splice(tagsToDelete, 1);
    this.setState({chips: this.state.chips});
  };

  render() {
    const actions = [
      <RaisedButton
        label="Edit"
        primary={true}
        type="submit"
        onTouchTap={this.handleSubmit.bind(this)}
      />,
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleCloseEditInfo.bind(this)}
      />
    ];
		return (
      <Dialog
        title="Edit project data"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.handleCloseEditInfo.bind(this)}
        autoScrollBodyContent={true}
      >
        <Row center="xs">
          <Col xs={12}>
            <ValidatorForm onSubmit={this.handleSubmit.bind(this)}>
              <Row>
                <TextValidator
                  floatingLabelText="Project name"
                  onChange={this.handleInputProjectName.bind(this)}
                  name="projectName"
                  fullWidth={true}
                  value={this.state.projectName}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Row>
              <Chips
                deleteTag={this.deleteTag.bind(this)}
                tags={this.state.chips}
                edit={true}
              />
              <Row>
                  <AutoComplete
                    floatingLabelText="Input tag"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={this.state.autoComlete}
                    onUpdateInput={this.handleInputTags.bind(this)}
                  />
                  <RaisedButton
                    label="Addtag"
                    primary={true}
                    onTouchTap={this.addNewTag.bind(this)}
                  />
              </Row>
              <Row>
                <TextValidator
                  floatingLabelText="Description"
                  multiLine={true}
                  fullWidth={true}
                  onChange={this.handleInputDescription.bind(this)}
                  name="description"
                  value={this.state.projectDescription}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Row>
            </ValidatorForm>
          </Col>
        </Row>
      </Dialog>
    );
  }
}
