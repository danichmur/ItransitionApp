import React from 'react';
import {
  IconButton,
  Avatar,
  IconMenu,
  MenuItem,
  Dialog,
  FlatButton,
  RaisedButton,
  AutoComplete,
  Chip,
  Divider,
  Checkbox,
}  from 'material-ui';
import { Row,Col } from 'react-flexbox-grid';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {Link } from 'react-router-dom';
import Chips from '../ProjectInfo/Chips';
import {List, ListItem} from 'material-ui/List';

export default class AddUsersDlg extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      oldUsers: [
        {id:34, name: 'Name1', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:35, name: 'Ekaterina', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:27, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:58, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:36, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:45, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:55, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:65, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:75, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:85, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:91, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:92, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:93, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:94, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:95, name: 'Жевняк Владислав', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:96, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:97, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:98, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:99, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        {id:52, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
      ],
      newUsers:[],
    }
  }

  handleCloseDlg() {
    this.props.closeDlg();
  }
  handleSubmit() {
    console.log(3423);
  }
  componentWillReceiveProps() {
    this.props.open ?
      (
        null
      )
    :
      (
        console.log('open'),
        this.state.newUsers = []
      )
  }

  editCheckArray(e, isChecked) {
    const userId = e.target.value;
    let user = this.state.oldUsers.find(person => person.id == userId);
    let indexOfUser = this.state.oldUsers.map((user) => user.id).indexOf(user.id);
    console.log(indexOfUser);
    isChecked ?
      (
        this.state.newUsers.push(user)
      )
    :
      (
        this.state.newUsers.splice(indexOfUser, 1)
      )
      console.log(this.state.newUsers)
  }

  editCheckBox() {

  }

  isPresent(user) {
    var isPresent = this.props.users.find(person => person.id == user.id);
    return isPresent = !!isPresent;
  };

  renderUser(user) {
    var isChecked = this.isPresent(user);
     isChecked ? this.state.newUsers.push(user) : null;
    return(
      <Row middle="xs" key={user.id}>
        <Col xs={1}>
        </Col>
        <Col xs={11} sm={11}>
          <ListItem
            leftCheckbox= {
              <Checkbox
                defaultChecked={isChecked}
                value={user.id}
                onCheck={this.editCheckArray.bind(this)}
              />
            }
          >
            <Row middle="xs">
              <Col>

              </Col>
              <Col>
                <Avatar size={55} src={user.avatar} />
              </Col>
              <Col xsOffset={1}>
                {user.name}
              </Col>
            </Row>
          </ListItem>
        </Col>
      </Row>
    );
  }

  render() {
		return (
      <Dialog
        title="Add new participants"
        actions={
          <Row end="xs">
            <RaisedButton
              label="Add"
              primary={true}
            />
            <FlatButton
              label="Close"
              primary={true}
              onTouchTap={this.handleCloseDlg.bind(this)}
            />
          </Row>
        }
        modal={false}
        open={this.props.open}
        onRequestClose={this.handleCloseDlg.bind(this)}
        autoScrollBodyContent={true}
      >

        <Row>
          <Col xs={12}>
            <ValidatorForm onSubmit={this.handleSubmit.bind(this)}>
              <List>
                  {this.state.oldUsers.map(this.renderUser, this)},
              </List>
            </ValidatorForm>
          </Col>
        </Row>

      </Dialog>
    );
  }
}
