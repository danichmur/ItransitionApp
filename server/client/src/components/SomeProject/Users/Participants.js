import React from 'react';
import { Row,Col } from 'react-flexbox-grid';
import {
  Avatar,
  IconButton,
  Subheader,
}  from 'material-ui';
import {List, ListItem} from 'material-ui/List';
import { Route, Link } from 'react-router-dom';
import AddFile from 'material-ui/svg-icons/content/add-circle-outline';
import ParticipantsDlg from '../Dialogs/ParticipantsDlg';
import AddUsersDlg from '../Dialogs/AddUsersDlg';

export default class Participants extends React.Component {

  constructor(props){
    super(props);
    this.styles = {
      participants: {
        marginTop:10,
        marginBottom:10,
      }
    }
    this.state = {
      participantsDlgOpen: false,
      addUserDlgOpen: false,
    }
  };

  handleOpenParticipants(){
    this.setState({participantsDlgOpen: !this.state.participantsDlgOpen});
  };

  handleOpenAddUser(){
    this.setState({addUserDlgOpen: !this.state.addUserDlgOpen});
  };

  render() {
		return (
      <Col className="backgroundStyle" xs={12} sm={4}  md={3} lg={3}>
        <Row>
          <Col xs={10}>
            <p
              style={{
                cursor:'pointer'
              }}
             onTouchTap={this.handleOpenParticipants.bind(this)}
            >
              Previous
            </p>
          </Col>
          <Col xs={2}>
            <IconButton
              tooltip="add users"
              touch={true}
              onTouchTap={this.handleOpenAddUser.bind(this)}
              >
              <AddFile />
            </IconButton>
          </Col>
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
        <ParticipantsDlg
          open={this.state.participantsDlgOpen}
          closeDlg={this.handleOpenParticipants.bind(this)}
        />
        <AddUsersDlg
          users={this.props.users}
          open={this.state.addUserDlgOpen}
          closeDlg={this.handleOpenAddUser.bind(this)}
        />
      </Col>
    );
  }
}
