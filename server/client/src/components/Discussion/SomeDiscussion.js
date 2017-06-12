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
      discussion: {
        id: null,
        title:null,
      },
    }
  };

  componentDidMount(){
    ApiQueries.getOneDiscussion(this.props.match.params.id, (data => {
      this.setState({ discussion: data });
    }));
  };

  render() {
    const { projects } = this.state;
		return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={8} md={8} lg={6}>
            <Row>

            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}
