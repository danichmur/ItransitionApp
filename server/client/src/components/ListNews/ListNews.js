import React from 'react';
import { Paper,Divider }  from 'material-ui';
import { Grid,Row,Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import { Link } from 'react-router-dom';
const news = [];
export default class ListNews extends React.Component {

  constructor(props){
    super(props);
  };

  render() {
		return (
      <List>
        {this.props.news.map(news => (
          <Paper
            zDepth={2}
            key={news.id}
            style={{margin:10}}
          >
            <ListItem
            secondaryText={
              <Row end="xs">
                Created by &nbsp;
                <Link
                  to={{
                    pathname:`/profile/${news.author}`
                  }}
                >{news.author }
                </Link>,
                {" " + news.created_at.split('T')[0]}
              </Row>
            }
            >
              <Row>
                <h3>{news.header}</h3>
              </Row>
              <Row>
                <p>{news.body}</p>
              </Row>
            </ListItem>
          </Paper>
        ))}
      </List>
    );
  }
}
