import React from 'react';
import {
  Paper,
  Divider,
  Chip,
  MenuItem,
  Avatar,
  RaisedButton,
}  from 'material-ui';
import { Grid,Row,Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import { Route, Link } from 'react-router-dom';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import ApiQueries from '../ApiQueries';
import './SomeDiscussion.scss';
export default class Discussions extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      discussion: {
        id: 4,
        title:"Present for director",
        messages: [
          { id:1, user_id: 25, created_at:"26.06.2014", text:"A custom handlerfor the click event. Works justA custom handlerfor the click event. Works just like a handler on an <a> tag - calling e.pA custom handlerfor the click event. Works just like a handler on an <a> tag - calling e.pA custom handlerfor the click event. Works just like a handler on an <a> tag - calling e.pA custom handlerfor the click event. Works just like a handler on an <a> tag - calling e.pA custom handlerfor the click event. Works just like a handler on an <a> tag - calling e.pA custom handlerfor the click event. Works just like a handler on an <a> tag - calling e.pA custom handlerfor the click event. Works just like a handler on an <a> tag - calling e.pA custom handlerfor the click event. Works just like a handler on an <a> tag - calling e.p like a handler on an <a> tag - calling e.preventDefault() will prevent the transition from firing, while e.stopPropagation() will prevent the event from bubbling."},
          { id:2, user_id: 26, created_at:"26.06.2014", text:"A custom handler for the click event. Works just like a handler on an <a> tag - calling e.preventDefault() will prevent the transition from firing, while e.stopPropagation() will prevent the event from bubbling."},
          { id:3, user_id: 27, created_at:"26.06.2014", text:"A custom handler for the click event. Works just like a handler on an <a> tag - calling e.preventDefault() will prevent the transition from firing, while e.stopPropagation() will prevent the event from bubbling."},
        ],
        users: [
          {id:25, name: 'Name1', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
          {id:26, name: 'Ekaterina', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
          {id:27, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
          {id:28, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
          {id:29, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        ],
      },
      newMessage: {
        id:null,
        user_id: null,
        created_at:null,
        text:'',
      }
    }
    this.style = {
      errorText: {
        zIndex:1000,
      }
    }
  };

  componentDidMount(){
    ApiQueries.getOneDiscussion(this.props.match.params.id, (data => {
      this.setState({ discussion: data });
    }));
  };

  renderMessage(message){
    var user = this.state.discussion.users[this.state.discussion.users.map((user) => user.id).indexOf(message.user_id)];
    return(
      <div className="news" key={message.id}>
        <Row>
          <Col xs={3} sm={3} md={2} lg={2}>
            <Link
              to={{
                pathname:`/profile/${user.id}`
              }}
            >
              <Avatar size={55} src={user.avatar}/>
            </Link>
          </Col>
          <Col xs={9} sm={9} md={10} lg={10}>
            <Row bottom="xs">
              <Link
                to={{
                  pathname:`/profile/${user.id}`
                }}
              >
                {user.name},
              </Link>
              {"" + message.created_at}
            </Row>
            <Row start="xs">
              {message.text}
            </Row>
          </Col>
        </Row>
        <Divider />
      </div>
    );
  };

  handleInputNews(e) {
    const value = e.target.value;
    this.setState({
      newMessage: {
        id: null,
        user_id: null,
        created_at: null,
        text: value,
      }
    });
  }

  handleSubmit() {
    this.state.discussion.messages.unshift({
      id: null,
      user_id: 26,
      text: this.state.newMessage.text,
    });
    this.setState({messages: this.state.discussion.messages});
  }
  render() {
    const { projects } = this.state;
		return (
      <Grid fluid>
        <Row center="xs">
          <Col className="backgroundStyle" xs={12} sm={10} md={10} lg={10}>
            <Row top="xs">
              <h1>{this.state.discussion.title}</h1>
            </Row>
            <Divider />
            {this.state.discussion.messages.map(this.renderMessage, this)}
            <Row start="xs">
              <Col xs={12}>
              <Divider />
                <ValidatorForm onSubmit={this.handleSubmit.bind(this)}>
                  <TextValidator
                    style={this.style.errorText}
                    floatingLabelText="Messages text"
                    multiLine={true}
                    fullWidth={true}
                    name="text"
                    onChange={this.handleInputNews.bind(this)}
                    value={this.state.newMessage.text}
                    validators={['required']}
                    errorMessages={['this field is required']}

                  />
                  <RaisedButton
                    label="Send"
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    type="submit"
                  />
                </ValidatorForm>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}
