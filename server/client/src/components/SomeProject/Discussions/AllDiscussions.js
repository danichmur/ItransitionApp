import React from 'react';
import {
  IconButton,
  Avatar,
  IconMenu,
}  from 'material-ui';
import ChatIcon from 'material-ui/svg-icons/communication/chat';
import AddFile from 'material-ui/svg-icons/content/add-circle-outline';
import RemovefileIcon from 'material-ui/svg-icons/action/delete';
import { Row,Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import {Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import AddDiscussionDlg from '../Dialogs/AddDiscussionDlg';

export default class Discussion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addDiscussionOpen: false,
    }
  };

  handleOpenAddDiscussion() {
    this.setState({addDiscussionOpen: !this.state.addDiscussionOpen});
  }

  addDiscussion(data) {
    this.props.changeDiscussion(data);
  };

  render() {
		return (
      <Col className="backgroundStyle" xs={12} sm={5} md={5} lg={5}>
        <List>
          <Row>
            <Col xs={10}>
              <p>Discussion</p>
            </Col>
            <Col xs={2}>
              <IconButton
                onTouchTap={this.handleOpenAddDiscussion.bind(this)}
                touch={true}
                tooltip="Add discussion" >
                <AddFile />
              </IconButton>
            </Col>
          </Row>
          {this.props.discussions.map(discussion => (
            <Link
              key={discussion.id}
              to={{
                pathname:`/discussion/${discussion.id}/project/${this.props.idProject}`
              }}
            >
            <ListItem
              leftAvatar={<Avatar icon={<ChatIcon />} />}
              primaryText={
                <Row>
                  <Col xs={10}>
                    {discussion.name}
                  </Col>
                  <Col  xs={1}>
                    <IconButton tooltip="Delete" >
                      <RemovefileIcon />
                    </IconButton>
                  </Col>
                </Row>
              }
              secondaryText={discussion.updated_at}
            />
            </Link>
          ))}
        </List>
        <AddDiscussionDlg
          open={this.state.addDiscussionOpen}
          closeDlg={this.handleOpenAddDiscussion.bind(this)}
          addDiscussion={this.addDiscussion.bind(this)}
        />
      </Col>
    );
  }
}
