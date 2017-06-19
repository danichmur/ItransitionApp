import React from 'react';
import cryptlib from 'cryptlib';
import { FloatingActionButton }  from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Grid,Row,Col } from 'react-flexbox-grid';
import {List} from 'material-ui/List';
import ProjectApi from '../../Api/ProjectApi';
import ListProject from '../ListProject/ListProject';
import AddProjectDlg from './Dialog/AddProjectDlg'

export default class AllProjects extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      projects: [],
      stateDialog: false,
    }
    let position = localStorage.getItem('position');
    if(!position) {
      this.userPosition = false;
    }
    else {
      this.userPosition = cryptlib.decrypt(position, '10', '10');
    }
    let id = localStorage.getItem('userId');
    if(!id) {
      this.userId = false;
    } else {
      this.userId = cryptlib.decrypt(id, '10', '10');
    }
  };

  componentDidMount(){
    ProjectApi.getAllProjects()
      .then(data => this.setState({ projects: data }));
  };

  openDlg() {
    this.setState({stateDialog: !this.state.stateDialog});
  }

  addProject(data) {
    this.state.projects.unshift(data);
    this.setState({projects: this.state.projects});
  }

  render() {
    const { projects } = this.state;
		return (
      <Grid fluid>
        <Row>
          <Col xs={12} smOffset={2} sm={8} md={8} mdOffset={2} lgOffset={3} lg={6}>
            <ListProject projects={this.state.projects} />
          </Col>
          {(this.userPosition == 0 || this.userPosition == 1) ?  (
            <FloatingActionButton
              style={{
                position: 'fixed',
                top: '20%',
                left: '85%'
              }}
              onTouchTap={this.openDlg.bind(this)}
            >
              <ContentAdd />
            </FloatingActionButton>
          ): null}
        </Row>
        <AddProjectDlg
          state={this.state.stateDialog}
          changeState={this.openDlg.bind(this)}
          userId={this.userId}
          sendData={this.addProject.bind(this)}
        />
      </Grid>
    );
  }
}
