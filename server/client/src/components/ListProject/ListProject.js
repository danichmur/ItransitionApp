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
      currentUrl: this.props.match,
    };
  };

  render() {
		return (
      <List>
        {this.props.projects.map((project) => (
          <Paper
            zDepth={2}
            key={project.id}
            style={{margin:10}}
          >
            <ListItem
              disabled={!project.active}
              secondaryText={
                <Row end="xs">
                  <Col xs={12}>
                    Created by &nbsp;
                    <Link
                      to={{
                        pathname:`/profile/${project.author}`
                      }}
                    >
                      {project.author }
                    </Link>,
                    {" " + project.created_at.split('T')[0]}
                  </Col>
                </Row>
              }
              style = {!project.active ? {backgroundColor: 'rgba(87, 115, 121, 0.5)'} : null}
            >
              <Row start="xs">
                <Col xs={12}>
                  <Link
                    key={project.id}
                    to={{
                      pathname:`/projects/${project.id}`
                    }}
                  >
                    <h3>{project.name}</h3>
                  </Link>
                  {!project.active ? <p>freezed</p> : null}
                </Col>
              </Row>
              <Divider />
              <Row start="xs">
                  <p>{project.description}</p>
              </Row>
              <Row>
               <Chips
                    tags={project.tags}
                    edit={false}
                />
              </Row>
              <Divider />
            </ListItem>
          </Paper>
        ))}
      </List>
    );
  }
}
