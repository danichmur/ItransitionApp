import React from 'react';
import { Row,Col } from 'react-flexbox-grid';
import { Avatar }  from 'material-ui';
import {List, ListItem} from 'material-ui/List';
import { Route, Link } from 'react-router-dom';

export default class Participants extends React.Component {

  constructor(props){
    super(props);
    this.styles = {
      participants: {
        marginTop:10,
        marginBottom:10,
      }
    }
  };

  handleOpenParticipants(){
    this.props.openDlg();
  };

  render() {
		return (
      <Col className="backgroundStyle" xs={12} sm={4}  md={3} lg={3}>
        <Row>
          <ListItem
            onTouchTap={this.handleOpenParticipants.bind(this)}
            primaryText="Participants"
          />
        </Row>
        <Row>
          {this.props.users.map(user => (
            <Col key={user.id} xs={4}>
              <Link
                to={{
                  pathname:`/profile/${user.id}`
                }}
              >
                <Row center="xs">
                  <Avatar size={60} src={user.avatar} />
                </Row>
                <Row style={this.styles.participants} center="xs">
                  {user.name}
                </Row>
              </Link>
            </Col>
          ))}
        </Row>
      </Col>
    );
  }
}
