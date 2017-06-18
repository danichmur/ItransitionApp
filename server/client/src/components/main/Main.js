import React from 'react';
import { Grid,Row,Col } from 'react-flexbox-grid';
import ListProject from '../ListProject/ListProject';
import ListNews from '../ListNews/ListNews';
import ProjectApi from '../../Api/ProjectApi';
import NewsApi from '../../Api/NewsApi';


export default class Main extends React.Component {

  constructor(props){
      super(props);
      this.state ={
        projects: [],
        news: [],
      }
  };

  componentDidMount() {
    ProjectApi.getFewActiveProjects()
      .then(data => {
        this.setState({projects:data})
      });
    NewsApi.getFewNews()
    .then(data => {
      this.setState({news:data})
    });
  }

  render() {
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={5} md={5}  lg={5}>
            <Row>
              <h1> Last News</h1>
            </Row>
            <Row>
              <ListNews news={this.state.news} />
            </Row>
          </Col>
          <Col xs={12} smOffset={1} sm={5} mdOffset={1} md={5} lgOffset={1} lg={5}>
            <Row>
              <h1>Last active project</h1>
            </Row>
            <Row>
              <ListProject projects={this.state.projects} />
            </Row>
          </Col>
        </Row>
      </Grid>

    );
  }
}
