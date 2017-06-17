import React from 'react';
import { Paper,Divider,Chip, MenuItem }  from 'material-ui';
import { Grid,Row,Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import { Route, Link } from 'react-router-dom';
import ProjectApi from '../../Api/ProjectApi';
import ListProject from '../ListProject/ListProject';

export default class AllProjects extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      projects: [],
    }
  };

  componentDidMount(){
    ProjectApi.getAllProjects()
      .then(data => this.setState({ projects: data }));
  };

  render() {
    const { projects } = this.state;
		return (
      <Grid fluid>
        <Row>
          <Col xs={12} smOffset={2} sm={8} md={8} mdOffset={2} lgOffset={3} lg={6}>
            <Paper zDepth={2}>
              <ListProject projects={this.state.projects} />
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}
