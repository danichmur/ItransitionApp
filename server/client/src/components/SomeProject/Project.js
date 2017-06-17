import React from 'react';
import ProjectInfo from './ProjectInfo/ProjectInfo'
import Participants from './Users/Participants'
import Discussions from './Discussions/AllDiscussions'
import Files from './Files/AllFiles'
import { Grid, Row, Col } from 'react-flexbox-grid';
import ApiQueries from '../ApiQueries';
import './Project.scss';

export default class AllProjects extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      project: {
        id: null,
        name: '',
        author: '',
        active: null,
        description: '',
        created_at: null,
        updated_at: null,
        users: [],
        tags: [],
        documents: [],
        discussions: [],
      },
    }
    this.projectData = null;
  };

  componentDidMount() {
    ApiQueries.getOneProject(this.props.match.params.id, (data => {
      this.projectData = data;
      this.setState({
        project: this.projectData});
    }));
  };


  changeData() {
    this.setState({ project: this.projectData });
  }

  changeInfo(data) {
    this.projectData.name = data.name;
    this.projectData.description = data.description;
    this.projectData.tags = data.tags;
    this.changeData();
  }


  changeUsers(data) {
    this.projectData.users = data;
    this.changeData();
  }

  addDiscussion(data) {
    this.projectData.discussions.push({id:data.id, name: data.name,})
    this.changeData();
  }

  removeDiscuddion(data) {
    const index = this.projectData.discussions.map((discussion) =>
      discussion.id).indexOf(data.id);
    this.projectData.discussions.splice(index,1);
    console.log(index)
    this.changeData();
  }

  addFile(data) {

  }

  removeFile(data) {

  }

  changeActive() {
    this.projectData.active = !this.projectData.active;
    this.changeData();
  }

  render() {
		return (
      <Grid fluid>
        <Row>
          <ProjectInfo
            changeActive={this.changeActive.bind(this)}
            sendChangedData={this.changeData.bind(this)}
            project={this.state.project}
          />
          <Participants
            newUsers={this.changeUsers.bind(this)}
            users={this.state.project.users}
            projectActive ={this.state.project.active}
            projectId={this.state.project.id}
          />
        </Row>
        {this.state.project.active ?
          <Row>
            <Files
              projectId ={this.state.project.id}
              documents={this.state.project.documents}
              addFile={this.addFile.bind(this)}
              removeFile={this.removeFile.bind(this)}
            />
            <Discussions
              discussions={this.state.project.discussions}
              projectId ={this.state.project.id}
              addDiscussion={this.addDiscussion.bind(this)}
              removeDiscuddion={this.removeDiscuddion.bind(this)}

            />
          </Row> : null}
      </Grid>
    );
  }
}
