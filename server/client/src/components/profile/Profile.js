import React from 'react';
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
    this.currentUser = localStorage.getItem('userId');
    this.state = {
      user: {
        projects:[]
      },
      isDlgOpen: false,
    }
  }

  componentDidMount() {
    UsersApi.getOneUser(this.props.match.params.id)
    .then((data) => {
      this.setState({ user: data} );
    });
  }

  openChangePhotoDlg(){
    this.setState({  isDlgOpen: !this.state.isDlgOpen })
  }

  updateUser(data) {
    data.email = this.state.user.email;
    data.projects = this.state.user.projects;
    this.setState({ user: data })
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
              <FlatButton
                label="Change photo"
                onTouchTap={this.openChangePhotoDlg.bind(this)}
              />
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
                <ListItem primaryText={this.state.user.position} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <h1></h1>
        </Row>
        <Row center="xs">
          <Col xs={12} sm={11} md={9} lg={8}>
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
