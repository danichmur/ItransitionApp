import React from 'react';
import {
  IconButton,
  Avatar,
}  from 'material-ui';
import AddFile from 'material-ui/svg-icons/content/add-circle-outline';
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file';
import RemovefileIcon from 'material-ui/svg-icons/action/delete';
import DownLoadFileIcon from 'material-ui/svg-icons/file/file-download';
import { Row,Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';

export default class Files extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
		return (
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
          {this.props.documents.map(document => (
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
    );
  }
}
