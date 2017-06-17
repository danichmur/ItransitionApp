import React from 'react';
import {
  IconButton,
  Avatar,
}  from 'material-ui';
import ChatIcon from 'material-ui/svg-icons/communication/chat';
import AddFile from 'material-ui/svg-icons/content/add-circle-outline';
import { Row,Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import {Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import AddDiscussionDlg from '../Dialogs/AddDiscussionDlg';
import DiscussionApi from '../../../Api/DiscussionApi';

export default class Discussion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addDiscussionOpen: false,
    }
  };

  deleteDiscussion(e) {
    DiscussionApi.deleteDiscussion(this.props.projectId,e.target.value)
      .then(this.props.removeDiscuddion({ id:e.target.value }));
  };

  handleOpenAddDiscussion() {
    this.setState({addDiscussionOpen: !this.state.addDiscussionOpen});
  };

  addDiscussion(data) {
    this.props.addDiscussion(data);
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
                onClick={this.handleOpenAddDiscussion.bind(this)}
                touch={true}
                disableTouchRipple={true}
                tooltip="Add discussion" >
                <AddFile/>
              </IconButton>
            </Col>
          </Row>
          {this.props.discussions.map(discussion => (

            <Row key={discussion.id} >
              <Col xs={10}>
                <Link
                  to={{
                    pathname:`/discussion/${discussion.id}/project/${this.props.projectId}`
                  }}
                >
                  <ListItem
                    leftAvatar={<Avatar icon={<ChatIcon />} />}
                    primaryText={
                      <Row>
                        <Col xs={10}>
                          {discussion.name}
                        </Col>
                      </Row>
                    }
                    secondaryText= {
                      "Last update " + discussion.updated_at.split('T')[0]
                    }
                  />
                  </Link>
                </Col>
                <Col xs={1}>
                  <IconButton
                    value={discussion.id}
                    style={{
                      backgroundColor: 'inherit',
                      backgroundImage: 'url(' + 'https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_delete_48px-24.png' + ')',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                    onTouchTap={this.deleteDiscussion.bind(this)}

                  >
                  </IconButton>
                </Col>
              </Row>
          ))}
        </List>
        <AddDiscussionDlg
          projectId={this.props.projectId}
          open={this.state.addDiscussionOpen}
          closeDlg={this.handleOpenAddDiscussion.bind(this)}
          addDiscussion={this.addDiscussion.bind(this)}
        />
      </Col>
    );
  }
}
