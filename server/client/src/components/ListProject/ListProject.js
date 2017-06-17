import React from 'react';
import { Paper, Divider }  from 'material-ui';
import { Grid,Row,Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import { Route, Link } from 'react-router-dom';
import Chips from '../Chips/Chips';

export default class ListProject extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      projects:[],
      currentUrs: this.props.match,
    }
  };

  componentWillReceiveProps() {
    console.log(this.props.match);
    console.log(this.state.currentUrs);
  }
  render() {
		return (
      <List>
        {this.props.projects.map((project) => (
          <ListItem
            key={project.id}
            secondaryText={
              <Row end="xs">
                Created by {project.author},{" " + project.created_at.split('T')[0]}
              </Row>
            }
          >
            <Row>
              <Col xs={12}>
                <Link
                  key={project.id}
                  to={{
                    pathname:`/projects/${project.id}`
                  }}
                >
                  <h3>{project.name}</h3>
                </Link>
              </Col>
            </Row>
            <Divider />
            <Chips
                tags={project.tags}
                edit={false}
            />
            <p>{project.description}</p>
            <Divider />
          </ListItem>
        ))}
      </List>
    );
  }
}
