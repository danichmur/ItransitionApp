import React from 'react';
import { Paper,Divider }  from 'material-ui';
import { Grid,Row,Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import ListNews from '../ListNews/ListNews';
import NewsApi from '../../Api/NewsApi';

const news = [];
export default class News extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      news: [],
    }
  };

  componentDidMount() {
    var data = NewsApi.getAllNews()
      .then(data => {
        console.log(data);
        this.setState({ news: data });
      });
  }

  render() {
		return (
      <Grid fluid>
        <Row>
          <Col smOffset={2} mdOffset={2} lgOffset={3}>
            <h1>News</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} smOffset={2} sm={8} md={8} mdOffset={2} lgOffset={3} lg={6}>
              <ListNews news={this.state.news} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
