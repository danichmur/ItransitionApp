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
      users: [
        {id:25, name: 'Name1', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:26, name: 'Ekaterina', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:27, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:28, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:29, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
      ],
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
          {this.state.users.map(user => (
            <Col key={user.id} xs={6} sm={3} md={2} lg={2}>
              <Link
                to={{
                  pathname:`/profile/${user.id}`
                }}
              >
                <Row center="xs">
                  <Avatar size={100} src={user.avatar} />
                </Row>
                <Row style={this.styles.participants} center="xs">
                  {user.name}
                </Row>
              </Link>
            </Col>
          ))}
        </Row>
      </Dialog>
    );
  }
}
