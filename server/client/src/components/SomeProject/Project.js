import React from 'react';
import { Paper,Divider,Chip, MenuItem }  from 'material-ui';
import { Grid,Row,Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import { Route, Link } from 'react-router-dom';
import ApiQueries from '../ApiQueries';

export default class AllProjects extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      project:null,
    }
  };


  componentDidMount(){
    ApiQueries.getOneProject(this.props.match.params.id, (data => {
      this.setState({ projects: data });
    }));
    console.log(this.state.project);
    sefe
  };
  render() {
		return (
      <Grid fluid>
        <Row>
          <Col xs={12} smOffset={2} sm={8} md={8} mdOffset={2} lgOffset={3} lg={6}>
          Project
          </Col>
        </Row>
      </Grid>
    );
  }
}
