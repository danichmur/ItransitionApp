import React from 'react';
import ProjectInfo from './ProjectInfo/ProjectInfo'
import Participants from './Users/Participants'
import Discussions from './Discussions/AllDiscussions'
import Files from './Files/AllFiles'
import { Grid, Row, Col } from 'react-flexbox-grid';
import ProjectApi from '../../Api/ProjectApi';
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
    ProjectApi.getOneProject(this.props.match.params.id).then(data => {
        this.projectData = data;
        this.setState({ project: this.projectData });
    });
  };


  changeData() {
    this.setState({ project: this.projectData });
  };

  changeInfo(data) {
    this.projectData.name = data.name;
    this.projectData.description = data.description;
    this.projectData.tags = data.tags;
    this.changeData();
  };

  changeUsers(data) {
    this.projectData.users = data;
    this.changeData();
  };

  addDiscussion(data) {
    this.projectData.discussions.push({
      id:data.id,
      name: data.name,
      updated_at: data.updated_at
    })
    this.changeData();
  };

  removeDiscuddion(data) {
    const index = this.projectData.discussions
      .map(discussion => discussion.id)
      .indexOf(parseInt(data.id));
    this.projectData.discussions.splice(index,1);
    console.log('delete dis')
    this.changeData();
  }

  addFile(data) {
      this.projectData.documents.push({id:data.id, name: data.name,})
      this.changeData();
  }

  removeFile(data) {
    const index = this.projectData.documents
      .map(doc => doc.id)
      .indexOf(parseInt(data.id));
    console.log(index);
    this.projectData.documents.splice(index,1);
    this.changeData();

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
            sendChangedData={this.changeInfo.bind(this)}
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
