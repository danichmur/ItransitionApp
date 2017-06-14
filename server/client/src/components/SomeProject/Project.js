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
        active: true,
        description: '',
        created_at: null,
        updated_at: null,
        users: [],
        tags: [],
        documents: [],
        discussions: [],
      },
    }
  };

  componentDidMount() {
    ApiQueries.getOneProject(this.props.match.params.id, (data => {
      this.setState({
        project: data});
    }));
  };

  changeData(data) {
    console.log(data)
    var updatedProject = {
      id: this.state.project.id,
      name: data.name,
      author: this.state.project.author,
      active: this.state.project.active,
      description: data.description,
      created_at: this.state.project.created_at,
      updated_at: this.state.project.updated_at,
      users: this.state.project.users,
      tags: data.tags,
      documents: this.state.project.documents,
      discussions: this.state.project.discussions,
    }
    this.setState({ project: updatedProject });

    ApiQueries.sendNewTags(this.state.project.id, {
      tags: data.tags,
    });
  }


  changeUsers(data) {
    var updatedProject = {
      id: this.state.project.id,
      name: this.state.project.name,
      author: this.state.project.author,
      active: this.state.project.author,
      description: this.state.project.description,
      created_at: this.state.project.created_at,
      updated_at: this.state.project.updated_at,
      users: data,
      tags: this.state.project.tags,
      documents: this.state.project.documents,
      discussions: this.state.project.discussions,
    }
    this.setState({ project: updatedProject})
  }

  changeDiscussion(data) {
    console.log(data);
  }

  render() {
		return (
      <Grid fluid>
        <Row>
          <ProjectInfo
            sendChangedData={this.changeData.bind(this)}
            project={this.state.project}
          />
          <Participants
            newUsers={this.changeUsers.bind(this)}
            users={this.state.project.users}
          />
        </Row>
        {this.state.project.active ?
          <Row>
            <Files documents={this.state.project.documents}/>
            <Discussions
              discussions={this.state.project.discussions}
              idProject ={this.state.project.id}
              changeDiscussion={this.changeDiscussion.bind(this)}
            />
          </Row> : null}
      </Grid>
    );
  }
}
