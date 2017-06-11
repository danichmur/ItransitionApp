import React from 'react';
import { Paper,Divider,Chip, MenuItem }  from 'material-ui';
import { Grid,Row,Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import { Route, Link } from 'react-router-dom';
import './AllProjects.scss';
import ApiQueries from '../ApiQueries';
import Main from '../main/Main';

export default class AllProjects extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      projects: [],
      linkTo:'',
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
                  <Link
                    key={project.id}
                    to={{
                      pathname:`/project/${project.id}`
                    }}
                  >
                    <ListItem
                      secondaryText={
                        <Row end="xs">
                          Created by {project.author},{project.created_at}
                        </Row>
                      }
                    >
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                    </ListItem>
                  </Link>
                )))}
              </List>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}
