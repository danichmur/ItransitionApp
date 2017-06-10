import React from 'react';
import { Grid,Row,Col } from 'react-flexbox-grid';
import { Avatar, ListItem } from 'material-ui';

export default class Main extends React.Component {

  constructor(props){
      super(props);
      this.state = {content:"dadwa"};
  }
  componentDidMount() {
    // return fetch('api/project.json')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     return responseJson.movies;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
      fetch('http://localhost:3001/api/project.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
        console.log(this);
        this.setState({content:"awdawd000"});
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
  }
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col md={6}>
          {this.state.content}
          </Col>
        </Row>
      </Grid>

    );
  }
}
