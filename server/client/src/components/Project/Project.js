import React from 'react';
import cryptlib from 'cryptlib';
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
      access: false,
    }
    this.projectData = null;
    let position = localStorage.getItem('position');
    if(!position) {
      this.userPosition = false
    }
    else {
      this.userPosition = cryptlib.decrypt(position, '10', '10');
    }
    let id = localStorage.getItem('userId');
    if(!id) {
      this.userId = false
    } else {
      this.userId = cryptlib.decrypt(id, '10', '10');
    }
  };

  componentDidMount() {
    ProjectApi.getOneProject(this.props.match.params.id).then(data => {
        this.projectData = data;
        let user = !!data.users.find(user => user.id == this.userId)
        this.setState({ project: this.projectData, access: user });
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
            userPosition={this.userPosition}
          />
          <Participants
            newUsers={this.changeUsers.bind(this)}
            users={this.state.project.users}
            projectActive ={this.state.project.active}
            projectId={this.state.project.id}
            userPosition={this.userPosition}
          />
        </Row>
        {this.state.project.active  ?
          (this.state.access || this.userPosition == 0) ?
          <Row>
            <Files
              projectId ={this.state.project.id}
              documents={this.state.project.documents}
              addFile={this.addFile.bind(this)}
              removeFile={this.removeFile.bind(this)}
              userPosition={this.userPosition}
            />
            <Discussions
              discussions={this.state.project.discussions}
              projectId ={this.state.project.id}
              addDiscussion={this.addDiscussion.bind(this)}
              removeDiscuddion={this.removeDiscuddion.bind(this)}
              userPosition={this.userPosition}
            />
          </Row> : null : null}
      </Grid>
    );
  }
}
