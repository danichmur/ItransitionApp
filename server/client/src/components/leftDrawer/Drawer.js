import React from 'react';
import { Drawer, Avatar, List, ListItem } from 'material-ui';
import { Grid,Row,Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import './Drawer.scss';

export default class DrawerSimpleExample extends React.Component {

  handleClose() {
    this.setState({open: false});
    this.props.drawerState.open = !this.props.drawerState.open;
  }
  render() {
    var imageStyle = {
      backgroundImage: 'url(' + 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg' + ')'
    };
    return (
      <div>
          <Drawer
            docked={false}
            open={this.props.drawerState.open}
            onRequestChange={this.handleClose.bind(this)}
            >
            <List>
              <Link to={'/profile'}>
                <ListItem className="menu-link"
                          onTouchTap={this.handleClose.bind(this)}>
                      <Row middle="xs">
                        <Col xs={4}><Avatar size={60} src='https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'/></Col>
                        <Col xs={8}>Владислав Жевняк</Col>
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
            <Link to="/projects">
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
              <ListItem className="menu-link"
                        onTouchTap={this.handleClose.bind(this)}>
                <Row center="xs">
                  <Col xs={12}>Settings </Col>
                </Row>
              </ListItem>
            </List>
          </Drawer>
      </div>
    );
  }
}
