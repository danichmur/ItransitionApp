import React from 'react';
import {
  Paper,
  Divider,
  Chip,
  MenuItem,
  Avatar,
  Subheader,
  IconButton,
  IconMenu,
}  from 'material-ui';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file';
import DownLoadFileIcon from 'material-ui/svg-icons/file/file-download';
import RemovefileIcon from 'material-ui/svg-icons/action/delete';
import ChatIcon from 'material-ui/svg-icons/communication/chat';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AddFile from 'material-ui/svg-icons/content/add-circle-outline';
import { Grid,Row,Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import {  Link } from 'react-router-dom';
import ApiQueries from '../ApiQueries';
import './Project.scss';

export default class AllProjects extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      project: {
        id: 1,
        name: 'Project',
        author: 'Manager',
        active: true,
        description: 'Sporem ipsum dolor sit amet, consectetuer dsdsdsds dsds d adipiscing elit, sed diem nonummy nibh euismod tincidunt ut lacreet dolore magna aliguam erat volutpat.  Ut wisis enim ad minim veniam, quis nostrud exerci tution ullamcorper suscipit  obortis nisl ut aliquip ex ea commodo consequat',
        created_at: '23.04.1997',
        updated_at: '23.04.2015',
        users: [
          {id:25, name: 'Name1', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
          {id:26, name: 'Ekaterina', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
          {id:27, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
          {id:28, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
          {id:29, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
          {id:30, name: 'Name3', avatar: 'https://pp.userapi.com/c637921/v637921451/4afed/YQLjcdSzWyU.jpg'},
        ],
        tags: [
          {id:1, value: 'Java'},
          {id:2, value: 'C#'},
          {id:3, value: 'C#'},
          {id:4, value: 'C#'},
          {id:5, value: 'C#'},
          {id:6, value: 'C#'}
        ],
        documents: [
          { id: 1, name: 'document1', url: 'dwdwadwad', updated_at: '23.04.2015'},
          { id: 2, name: 'document1', url: 'dwdwadwad', updated_at: '23.04.2015'},
          { id: 3, name: 'document1', url: 'dwdwadwad', updated_at: '23.04.2015'},
          { id: 4, name: 'document1', url: 'dwdwadwad', updated_at: '23.04.2015'},
          { id: 5, name: 'document1', url: 'dwdwadwad', updated_at: '23.04.2015'},
        ],
        discussions: [
          { id: 1, name: 'discussions1', url: 'dwdwadwad', updated_at: '23.04.2015'},
          { id: 2, name: 'discussions1', url: 'dwdwadwad', updated_at: '23.04.2015'},
          { id: 3, name: 'discussions1', url: 'dwdwadwad', updated_at: '23.04.2015'},
          { id: 4, name: 'discussions1', url: 'dwdwadwad', updated_at: '23.04.2015'},
          { id: 5, name: 'discussions1', url: 'dwdwadwad', updated_at: '23.04.2015'},
        ],
      },
    };
    this.styles = {
      chip: {
        margin: 5,
      },
      participants: {
        marginTop:10,
        marginBottom:10,
      }
    }
  };

  componentDidMount(){
    ApiQueries.getOneProject(this.props.match.params.id, (data => {
      this.setState({ projects: data });
    }));
  };

  renderChip(tag) {
    return (
      <Chip
        style={this.styles.chip}
        key={tag.id}
      >
      {tag.value}
      </Chip>
    )
  };
  render() {
		return (
      <Grid fluid>
        <Row>
          <Col className="backgroundStyle" xs={12} sm={7} md={8} lg={8}>
            <Row>
              <Col xs={10} sm={11}>
                <h1>{this.state.project.name}</h1>
              </Col>
              <Col xs={2} sm={1}>
                <IconMenu
                   iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                   anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                   targetOrigin={{horizontal: 'right', vertical: 'top'}}
                 >
                   <MenuItem primaryText="Edit" />
                   <Divider />
                   <MenuItem primaryText="Delete" />
                </IconMenu>
              </Col>
            </Row>
            <Row>
              {this.state.project.tags.map(this.renderChip, this)}
            </Row>
            <Row>
              <p>{this.state.project.description}</p>
            </Row>
          </Col>
          <Col className="backgroundStyle" xs={12} sm={4}  md={3} lg={2}>
            <Row>
              <p>Participants</p>

            </Row>
            <Row>
              {this.state.project.users.map(user => (
                    <Col key={user.id} xs={4}>
                      <Link
                        to={{
                          pathname:`/profile/${user.id}`
                        }}
                      >
                          <Row center="xs">
                            <Avatar size={60} src={user.avatar} />
                          </Row>
                          <Row style={this.styles.participants} center="xs">
                            {user.name}
                          </Row>
                        </Link>
                    </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className="backgroundStyle" xs={12} sm={6} md={6} lg={5}>
              <List>
                <Row>
                  <Col xs={10}>
                    <p>Files</p>
                  </Col>
                  <Col xs={2}>
                    <IconButton tooltip="add file" touch={true}>
                      <AddFile />
                    </IconButton>
                  </Col>
                </Row>
                {this.state.project.documents.map(document => (
                  <ListItem
                    key={document.id}
                    leftAvatar={<Avatar icon={<FileIcon />} />}
                    primaryText={
                      <Row>
                        <Col xs={8}>
                          {document.name}
                        </Col>
                        <Col xs={2}>
                          <IconButton tooltip="add file" touch={true}>
                            <DownLoadFileIcon />
                          </IconButton>
                        </Col>
                        <Col xs={2}>
                          <IconButton tooltip="add file" touch={true}>
                            <RemovefileIcon />
                          </IconButton>
                        </Col>
                      </Row>
                    }
                    secondaryText={document.updated_at}
                  >

                  </ListItem>
                ))}
              </List>
          </Col>
          <Col className="backgroundStyle" xs={12} sm={5} md={5} lg={5}>
            <List>
                <p>Discussions</p>
                {this.state.project.discussions.map(discussion => (
                  <ListItem
                    key={discussion.id}
                    leftAvatar={<Avatar icon={<ChatIcon />} />}
                    primaryText={discussion.name}
                    secondaryText={discussion.updated_at}
                  />
                ))}

            </List>
          </Col>
        </Row>
      </Grid>
    );
  }
}
