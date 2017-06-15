import React from 'react';
import { Paper,Divider }  from 'material-ui';
import { Grid,Row,Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import './News.scss';

const news = [];
export default class News extends React.Component {

  constructor(props){
    super(props);
    for (var i = 0; i < 10; i++) {
      news[i] = { title:"Changes in project: CourseWorrk for iTransition", discription:"The element to use as the container for the ListItem. Either a string to use a DOM element or a ReactElement. This is useful for wrapping the ListItem in a custom Link component. If a ReactElement is given, ensure that it passes all of its given props through to the underlying DOM element and renders its children prop for proper integration."
    }
  }
}
  render() {
		return (
      <Grid fluid>
        <Row>
          <Col xs={12} smOffset={2} sm={8} md={8} mdOffset={2} lgOffset={3} lg={6}>
            <Paper zDepth={2}>
              <List>
                {news.map(news => (
                  <ListItem
                  >
                    <h3>{news.title}</h3>
                    <p>{news.discription}</p>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}
