import React from 'react';
import { Paper,Divider,Chip, MenuItem }  from 'material-ui';
import { Grid,Row,Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import './AllProjects.scss';
import ApiQueries from '../ApiQueries';

export default class AllProjects extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      projects: [],
    }
  };

  componentDidMount(){
    ApiQueries.getFewProjects((allProjects => {
      this.setState({ projects: allProjects });
    }));
  };

  render() {
    const { projects } = this.state;
		return (
      <Grid fluid>
        <Row>
          <Col xs={12} smOffset={2} sm={8} md={8} mdOffset={2} lgOffset={3} lg={6}>
            <Paper zDepth={2}>
              <List>
                {this.state.projects.map((project => (
                  <ListItem
                    key = {project.id}
                    secondaryText={
                      <Row end="xs">
                        Created by {project.author},09.06.2017
                      </Row>
                    }
                  >
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                  </ListItem>
                )))}
              </List>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}
