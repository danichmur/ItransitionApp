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
      newComment: {
        id: null,
        body: '',
        user_id: null,
        created_at:null,
        updated_at: null,
        user_name:'',
      }
    }
    this.style = {
      errorText: {
        zIndex:1000,
      }
    }
  };

  componentDidMount(){
    UsersApi.getAllProjectUser(this.props.match.params.id)
      .then(data =>   this.setState({users: data}));
    DiscussionApi.getOneDiscussion(this.props.match.url)
    .then(data =>  is.setState({ discussion: data }));
  };

  renderComment(comment){
    var user = this.state.users[this.state.users.map((user) => user.id).indexOf(comment.user_id)];
    return(
      <div className="news" key={comment.id}>
        <Row>
          <Col xs={3} sm={3} md={2} lg={2}>
            <Link
              to={{
                pathname:`/profile/${user.id}`
              }}
            >
              <Avatar size={55} src={user.photo}/>
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
              {"" + comment.created_at}
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

  handleInputNews(e) {
    const value = e.target.value;
    this.setState({
      newComment: {
        id: null,
        body: value,
        user_id: 200,
        created_at:null,
        updated_at: null,
        user_name:null,
      }
    });
  };

  handleSubmit() {
    this.state.discussion.comments.push({
        id: this.state.discussion.comments.length + 1,
        body:  this.state.newComment.body,
        user_id: 4,
        created_at:null,
        updated_at: null,
        user_name: 'adwwd',
    });
    this.setState({messages: this.state.discussion.messages});
  };

  render() {
    const { projects } = this.state;
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
  }
}
