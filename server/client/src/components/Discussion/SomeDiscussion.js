import React from 'react';
import {
  Divider,
  Avatar,
  RaisedButton,
}  from 'material-ui';
import { Grid,Row,Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DiscussionApi from '../../Api/DiscussionApi';
import UsersApi from '../../Api/UsersApi';
import './SomeDiscussion.scss';
import { Redirect } from 'react-router-dom';

export default class Discussions extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      discussion: {
        id: null,
        name: '',
        project_id: null,
        published_at: null,
        created_at: null,
        updated_at: null,
        comments: [],
      },
      users: [],
      newComment : {
        body:'',
      },
      access: false,
    }
    if(!position) {
      this.userPosition = false
    }
    else {
      this.userPosition = cryptlib.decrypt(position, '10', '10');
    }
    let id = localStorage.getItem('userId');
    if(!id) {
      this.userId = false
    } else {
      this.userId = cryptlib.decrypt(id, '10', '10');
    }

    this.style = {
      errorText: {
        zIndex:1000,
      }
    }
    this.user = {};
  };

  componentDidMount(){
    UsersApi.getAllProjectUser(this.props.match.params.id)
      .then(data => {
        ;
        this.user = data.find(user => user.id == id);
        let user = !!data.find(user => user.id == this.userId)
        this.setState({ users: data, access: user });
      });
    DiscussionApi.getOneDiscussion(this.props.match.url)
    .then(data => this.setState({ discussion: data }));
  };


  handleInputNews(e) {
    const value = e.target.value;
    this.setState({
      newComment: {
        body: value,
      }
    });
  };

  handleSubmit() {
    DiscussionApi.sendNewComment(
      this.props.match.params.id,
      this.state.discussion.id,
      {body: this.state.newComment.body, user_id: localStorage.getItem('userId')}
    ).then(data => {
      this.state.discussion.comments.push({
          id:data.id,
          body: this.state.newComment.body,
          user_id:this.user.id,
          updated_at: data.updated_at,
          userName: this.user.name,
      });
      this.setState({messages: this.state.discussion.messages, newComment:{body:''}});
    });

  };

  renderComment(comment){
    var user = this.state.users.find(user => user.id == comment.user_id);
    return(
      <div className="news" key={comment.id}>
        <Row>
          <Col xs={3} sm={3} md={2} lg={2}>
            <Link
              to={{
                pathname:`/profile/${user.id}`
              }}
            >
              <Avatar
                size={55}
                src={user.photo}
              />
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
              {" " + comment.updated_at.split('T')[0]}
            </Row>
            <Row start="xs">
              {comment.body}
            </Row>
          </Col>
        </Row>
        <Divider />
      </div>
    );
  };

  render() {
    if (this.state.access || this.userPosition == 0) {
  		return (
        <Grid fluid>
          <Row center="xs">
            <Col className="backgroundStyle" xs={12} sm={10} md={10} lg={10}>
              <Row top="xs">
                <h1>{this.state.discussion.name}</h1>
              </Row>
              <Divider />
              {this.state.discussion.comments.map(this.renderComment, this)}
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
                      value={this.state.newComment.body}
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
    } else {
      return(
        <Redirect to='/main'/>
      )
    }
  }
}
