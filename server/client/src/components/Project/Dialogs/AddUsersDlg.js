import React from 'react';
import {
  Avatar,
  Dialog,
  FlatButton,
  RaisedButton,
  Checkbox,
}  from 'material-ui';
import { Row,Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import { ValidatorForm } from 'react-material-ui-form-validator';
import UsersApi from '../../../Api/UsersApi';


export default class AddUsersDlg extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allUser: [],
      newUsers:[],
    };
  };

  handleCloseDlg() {
    this.props.closeDlg();
  };

  handleSubmit() {
    UsersApi.sendNewUsers(this.props.projectId,this.state.newUsers);
    this.props.sendSnangeUsers(this.state.newUsers);
    this.handleCloseDlg();
  };

  componentWillReceiveProps() {
    if (!this.props.open) {
      this.state.newUsers = [];
      UsersApi.getAllUser()
        .then(data =>this.setState({allUser: data}));
      this.props.oldUsers
        .map(user =>(this.state.newUsers.push(user)));
      }
  };

  editCheckArray(e, isChecked) {
    const userId = e.target.value;
    let user = this.state.allUser.find(person => person.id == userId);
    let indexOfUser = this.state.newUsers
      .map((user) => user.id).indexOf(user.id);
    if (isChecked) {
      this.state.newUsers.push(user);
    } else {
      this.state.newUsers.splice(indexOfUser, 1);
    }
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