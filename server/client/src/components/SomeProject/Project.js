import React from 'react';
import ProjectInfo from './ProjectInfo/ProjectInfo'
import Participants from './Users/Participants'
import Discussions from './Discussions/AllDiscussions'
import Files from './Files/AllFiles'
import ParticipantsDlg from './Dialogs/ParticipantsDlg'
import { Grid, Row, Col } from 'react-flexbox-grid';

import ApiQueries from '../ApiQueries';
import './Project.scss';

export default class AllProjects extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      project: {
        id: 1,
        name: 'Project',
        author: 'Manager',
        active: true,
        description: 'Sporem ipsum dolor sit amet, consectetuer dsdsdsds dsds d adipiscing elit, sed diem nonummy nibh euismod tincidunt ut lacreet dolore magna aliguam erat volutpat.  Ut wisis enim ad minim veniam, quis nostrud exerci tution ullamcorper suscipit  obortis nisl ut aliquip ex ea commodo consequat',
        created_at: '23.04.1997',
        updated_at: '23.04.2015',
        users: [
          {id:25, name: 'Name1', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
          {id:26, name: 'Ekaterina', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
          {id:27, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
          {id:28, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
          {id:29, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        ],
        tags: [
          {id:1, value: 'Java'},
          {id:2, value: 'C#'},
          {id:3, value: 'C#'},
          {id:4, value: 'C#'},
          {id:5, value: 'C#'},
          {id:6, value: 'C#'}
        ],
        documents: [
          { id: 1, name: 'documeф вывыф ывфвыв вфы вфыв фывфыв ыфв фывыф вnt1 выфвфы выфв фы', url: 'dwdwadwad', updated_at: '23.04.2015'},
          { id: 2, name: 'document1', url: 'dwdwadwad', updated_at: '23.04.2015'},
          { id: 3, name: 'document1', url: 'dwdwadwad', updated_at: '23.04.2015'},
          { id: 4, name: 'document1', url: 'dwdwadwad', updated_at: '23.04.2015'},
          { id: 5, name: 'document1', url: 'dwdwadwad', updated_at: '23.04.2015'},
        ],
        discussions: [
          { id: 1, name: 'discussions1', url: 'dwdwadwad', updated_at: '23.04.2015'},
          { id: 2, name: 'discussions1', url: 'dwdwadwad', updated_at: '23.04.2015'},
          { id: 3, name: 'discussions1', url: 'dwdwadwad', updated_at: '23.04.2015'},
          { id: 4, name: 'discussions1', url: 'dwdwadwad', updated_at: '23.04.2015'},
          { id: 5, name: 'discussions1', url: 'dwdwadwad', updated_at: '23.04.2015'},
        ],
      },
      participantsOpen: false,
    }
  };

  componentDidMount(){
    ApiQueries.getOneProject(this.props.match.params.id, (data => {
      this.setState({ projects: data });
    }));
  };

  openParticipantsDlg() {
    this.setState({participantsOpen: !this.state.participantsOpen});
  };

  render() {
		return (
      <Grid fluid>
        <ParticipantsDlg
          open={this.state.participantsOpen}
          users={this.state.project.users}
          openDlg={this.openParticipantsDlg.bind(this)}
        />
        <Row>
          <ProjectInfo
            project={this.state.project}
          />
          <Participants
            users={this.state.project.users}
            openDlg={this.openParticipantsDlg.bind(this)}
          />
        </Row>
        {this.state.project.active ?
          <Row>
            <Files documents={this.state.project.documents}/>
            <Discussions discussions={this.state.project.discussions}/>
          </Row> : null}
      </Grid>
    );
  }
}
