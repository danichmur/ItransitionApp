import React from 'react';
import { Drawer, Avatar, List, ListItem, Toggle } from 'material-ui';
import { Grid,Row,Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import './Drawer.scss';

export default class DrawerSimpleExample extends React.Component {

  constructor(props) {
    super(props);
    this.toggled = false;
  }

  handleClose() {
    this.props.drawerClose();
  }

  changeTheme(data) {
    this.toggled = !this.toggled;
    localStorage.setItem('theme', this.toggled)
    this.props.changeTheme(this.toggled);
  }

  render() {
    return (
      <div>
        <Drawer
          docked={false}
          open={this.props.drawerState}
          onRequestChange={this.handleClose.bind(this)}
          >
          <List>
            <Link
              to={{
                pathname:`/profile/${this.props.user.id}`,
                state: {hash: true},
              }}
            >
              <ListItem className="menu-link"
                        onTouchTap={this.handleClose.bind(this)}>
                    <Row middle="xs">
                      <Col xs={4}><Avatar size={60} src={this.props.user.photo}/></Col>
                      <Col xs={8}>{this.props.user.name}</Col>
                    </Row>
              </ListItem>
            </Link>
          <Link to="/main">
            <ListItem className="menu-link"
                      onTouchTap={this.handleClose.bind(this)}>
              <Row center="xs">
                <Col xs={12}>Main</Col>
              </Row>
            </ListItem>
          </Link>
          <Link to="/allprojects">
            <ListItem className="menu-link"
                      onTouchTap={this.handleClose.bind(this)}>
              <Row center="xs">
                <Col xs={12}>Projects</Col>
              </Row>
            </ListItem>
          </Link>
          <Link  to="/news">
            <ListItem className="menu-link"
                      onTouchTap={this.handleClose.bind(this)}>
              <Row center="xs">
                <Col xs={12}>News</Col>
              </Row>
            </ListItem>
          </Link>
            <ListItem
              className="menu-link"
            >
              <Row>
                <Col xs={4}>Light</Col>
                <Col xs={4}>
                  <Toggle toggled={localStorage.getItem('theme') == 'true'} onToggle={this.changeTheme.bind(this)}/>
                </Col>
                <Col xs={4}>Dark </Col>
              </Row>
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}
