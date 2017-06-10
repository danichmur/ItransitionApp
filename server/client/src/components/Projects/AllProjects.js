import React from 'react';
import { Paper,Divider,Chip }  from 'material-ui';
import { Grid,Row,Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import './AllProjects.scss';

const news = [];
const styles = {
  chip: {
    margin: 4,
  },
};
function handleTouchTap() {
  alert('You clicked the Chip.');
}
export default class AllProjects extends React.Component {

  constructor(props){
    super(props);
    for (var i = 0; i < 10; i++) {
      news[i] = {
        title:"Changes in project: CourseWorrk for iTransition",
        discription:"The element to use as the container for the ListItem. Either a string to use a DOM element or a ReactElement. This is useful for wrapping the ListItem in a custom Link component. If a ReactElement is given, ensure that it passes all of its given props through to the underlying DOM element and renders its children prop for proper integration.",
        tegs:"CSS"
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
                    secondaryText={
                      <Row end="xs">
                        Created at 12.04.2005
                        <br></br>
                        Last changes 09.06.2017
                      </Row>
                }
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
