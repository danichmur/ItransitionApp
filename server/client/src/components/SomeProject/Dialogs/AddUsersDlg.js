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
import Chips from '../ProjectInfo/Chips';
import {List, ListItem} from 'material-ui/List';
import ApiQueries from '../../ApiQueries';

export default class AddUsersDlg extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allUser: [],
      newUsers:[],
    }
  }

  handleCloseDlg() {
    this.props.closeDlg();
  }
  handleSubmit() {

    ApiQueries.sendNewUsers(this.props.projectId,this.state.newUsers);
    this.props.sendSnangeUsers(this.state.newUsers);
    this.handleCloseDlg();
  }
  componentWillReceiveProps() {
    this.props.open ?
      (
        null
      )
    :
      (
        console.log("delete"),
        this.state.newUsers = [],
        console.log("reu"),
        ApiQueries.getAllUser((data => {
          this.setState({allUser: data});
        }))
          ,
          console.log("add"),
        this.props.oldUsers.map(user =>(
            this.state.newUsers.push(user)
        )),
        console.log(this.state.newUsers)

      )
  }
  editCheckArray(e, isChecked) {
    const userId = e.target.value;
    let user = this.state.allUser.find(person => person.id == userId);
    let indexOfUser = this.state.newUsers.map((user) => user.id).indexOf(user.id);
    console.log(indexOfUser);
    isChecked ?
      (
        this.state.newUsers.push(user)
      )
    :
      (
        this.state.newUsers.splice(indexOfUser, 1)
      )
  }

  isPresent(user) {
    var isPresent = this.props.oldUsers.find(person => person.id == user.id);
    return isPresent = !!isPresent;
  };

  renderUser(user) {
    let isChecked = this.isPresent(user);
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
                <Avatar size={55} src={user.photo} />
              </Col>
              <Col xsOffset={1}>
                {user.nickname}
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
              onTouchTap={this.handleSubmit.bind(this)}
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
                  {this.state.allUser.map(this.renderUser, this)}
              </List>
            </ValidatorForm>
          </Col>
        </Row>

      </Dialog>
    );
  }
}
