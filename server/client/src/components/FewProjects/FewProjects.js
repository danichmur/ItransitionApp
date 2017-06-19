import React from 'react';
import { Paper,Divider,Chip, MenuItem }  from 'material-ui';
import { Grid,Row,Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import { Route, Link } from 'react-router-dom';
import ProjectApi from '../../Api/ProjectApi';
import ListProject from '../ListProject/ListProject';

export default class FewProject extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    }
    this.willUptate = null;
  };

  componentDidMount(){
    ProjectApi.getFewProjects(this.props.match.params.id)
      .then(data => this.setState({ projects: data }));
      this.willUptate = this.props.location.key;
  };

  componentDidUpdate() {
    this.props.location.key != this.willUptate ? window.location.reload() : null;
  }
  render() {
    const { projects } = this.state;
		return (
      <Grid fluid>
        <Row>
          <Col xs={12} smOffset={2} sm={8} md={8} mdOffset={2} lgOffset={3} lg={6}>
              <ListProject
                match={this.props.match}
                projects={this.state.projects}
              />
          </Col>
        </Row>
      </Grid>
    );
  }
}
