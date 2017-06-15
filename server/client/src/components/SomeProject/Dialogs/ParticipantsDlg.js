import React from 'react';
import {
  IconButton,
  Avatar,
  IconMenu,
  Dialog,
  FlatButton,
}  from 'material-ui';
import { Row,Col } from 'react-flexbox-grid';
import {Link } from 'react-router-dom';
import ApiQueries from '../../ApiQueries';

export default class ParticipantsDlg extends React.Component {

  constructor(props) {
    super(props);
    this.styles = {
      participants: {
        marginTop:10,
        marginBottom:10,
      }
    }
    this.state = {
      users: [],
    }
  };

  handleCloseParticipants() {
    this.props.closeDlg();
  };

  

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleCloseParticipants.bind(this)}
      />,
    ];
		return (
      <Dialog
        title="All participants"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.handleCloseParticipants.bind(this)}
        autoScrollBodyContent={true}
      >
        <Row>
          {this.props.users.map(user => (
            <Col key={user.id} xs={6} sm={3} md={2} lg={2}>
              <Link
                to={{
                  pathname:`/profile/${user.id}`
                }}
              >
                <Row center="xs">
                  <Avatar size={100} src={user.photo} />
                </Row>
                <Row style={this.styles.participants} center="xs">
                  {user.nickname}
                </Row>
              </Link>
            </Col>
          ))}
        </Row>
      </Dialog>
    );
  }
}
