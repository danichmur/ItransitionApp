import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { List, ListItem } from 'material-ui/List';
import {FlatButton, TextField} from 'material-ui';
import UsersApi from '../../Api/UsersApi';
import './Profile.scss';

const headerStyle = {
  fontWeight: 900,
};

const nameStyle = {
  fontSize:40,
  fontWeight:700,
  lineHeight: 'normal',
}



export default class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    UsersApi.getOneUser(2)
    .then(data => console.log(data));
  }

  render() {
    var sectionStyle = {
      backgroundImage: 'url(' + 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg' + ')',
      height:"200px"
    };

    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={3} md={3} lg={3}>
            <Row  id='profile-img' style={sectionStyle}/>
            <Row center="xs">
              <FlatButton label="Change photo"  />
            </Row>
          </Col>
          <Col xs={12} sm={8} md={6} lg={3}>
            <Row>
              <ListItem style={nameStyle} primaryText="Владислав Жевняк" />
            </Row>
            <Row>
              <Col>
                <ListItem style={headerStyle} primaryText="Unique nickname:" />
              </Col>
              <Col>
                <ListItem primaryText="Luxorik" />
              </Col>
            </Row>
            <Row>
              <Col>
                <ListItem style={headerStyle} primaryText="Email:" />
              </Col>
              <Col>
                <ListItem primaryText="Delovayadddddddddkolbasa1@gmail.com" />
              </Col>
            </Row>
            <Row>
              <Col>
                <ListItem style={headerStyle} primaryText="Position:" />
              </Col>
              <Col>
                <ListItem primaryText="Manager" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}
