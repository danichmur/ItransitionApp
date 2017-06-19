import React from 'react';
import cryptlib from 'cryptlib';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { List, ListItem } from 'material-ui/List';
import {FlatButton, TextField} from 'material-ui';
import UsersApi from '../../Api/UsersApi';
import ListProject from '../ListProject/ListProject';
import ChangePhotoDlg from './Dialogs/ChangePhotoDlg';
import './Profile.scss';

const headerStyle = {
  fontWeight: 900,
};

const nameStyle = {
  fontSize:40,
  fontWeight:700,
  lineHeight: 'normal',
}

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.currentUserId = localStorage.getItem('userId');
    this.positions = {0: 'admin', 1: 'manager', 2: 'developer'};
    this.state = {
      user: {
        projects:[]
      },
      isDlgOpen: false,
    }
    this.willUptate = null;
    let position = localStorage.getItem('position');
    if(!position) {
      this.userPosition = false
    }
    else {
      console.log()
      this.userPosition = this.positions[cryptlib.decrypt(position, '10', '10')];
    }
    let id = localStorage.getItem('userId');
    if(!id) {
      this.userId = false
    } else {
      this.userId = cryptlib.decrypt(id, '10', '10');
    }
  }

  componentWillReceiveProps() {
    // window.location.reload();
  };

  componentDidMount() {
    UsersApi.getOneUser(this.props.match.params.id)
    .then((data) => {
      let user = data;
      console.log(data)
      user.position = this.positions[data.position];
      this.setState({ user: user });
    });
    this.willUptate = this.props.location.key;
  };

  componentDidUpdate() {
    if (this.props.location.key != this.willUptate) {
      UsersApi.getOneUser(this.props.match.params.id)
      .then((data) => {
        let user = data;
        console.log(data)
        user.position = this.positions[data.position];
        this.setState({ user: user });
      });
    this.willUptate = this.props.location.key;
    };

  };

  openChangePhotoDlg(){
    this.setState({  isDlgOpen: !this.state.isDlgOpen })
  };

  updateUser(data) {
    data.email = this.state.user.email;
    data.projects = this.state.user.projects;
    this.setState({ user: data })
  };

  renderEditButton() {

    if (this.props.match.params.id == this.userId || this.userPosition == 'admin' ) {
      return (
        <FlatButton
          label="Edit profile"
          onTouchTap={this.openChangePhotoDlg.bind(this)}
        />
      );
    } else {
      return (null);
    }
  }
  render() {
    var sectionStyle = {
      backgroundImage: 'url(' + this.state.user.photo + ')',
      height:"200px"
    };
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={3} md={3} lg={3}>
            <Row  id='profile-img' style={sectionStyle}/>
            <Row center="xs">
              {this.renderEditButton()}
            </Row>
          </Col>
          <Col xs={12} sm={8} md={6} lg={5}>
            <Row center="xs" start="sm">
              <ListItem style={nameStyle} primaryText={this.state.user.name} />
            </Row>
            <Row center="xs" start="sm">
              <Col>
                <ListItem primaryText={this.state.user.nickname} />
              </Col>
            </Row>
            <Row center="xs" start="sm">
              <Col>
                <ListItem primaryText={this.state.user.email} />
              </Col>
            </Row>
            <Row center="xs" start="sm">
              <Col>
                <ListItem
                  primaryText={
                    <span>{this.positions[this.state.user.position]}</span>
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <h1></h1>
        </Row>
        <Row >
          <Col xs={12} smOffset={1} sm={10} mdOffset={2} md={8} lgOffset={2} lg={8}>
            <ListProject projects={this.state.user.projects} />
          </Col>
        </Row>
        <ChangePhotoDlg
          open={this.state.isDlgOpen}
          closeDlg={this.openChangePhotoDlg.bind(this)}
          userInfo={this.state.user}
          match={this.props.match}
          sendData={this.updateUser.bind(this)}
        />
      </Grid>
    );
  }
}
