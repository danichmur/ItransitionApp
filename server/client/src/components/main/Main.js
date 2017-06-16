import React from 'react';
import { Grid,Row,Col } from 'react-flexbox-grid';
import { Avatar, ListItem } from 'material-ui';

export default class Main extends React.Component {

  constructor(props){
      super(props);
  };

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col md={6}>
            <h1>where</h1>
            <h1>where</h1>
            <h1>where</h1>
            <h1>where</h1>
          </Col>
        </Row>
      </Grid>

    );
  }
}
