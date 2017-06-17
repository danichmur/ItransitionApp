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
import AddFileDlg from '../Dialogs/AddFileDlg';
import FileApi from '../../../Api/FileApi';

export default class Files extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addFileOpen: false,
    }
  };

  openAddFileDlg() {
    this.setState({addFileOpen: !this.state.addFileOpen});
  };

  addFile(data) {
    this.props.addFile(data);
  }

  deleteFile(e) {
    console.log(1)
    FileApi.deleteFile(this.props.projectId, e.target.value)
      .then(data => console.log(data))
      .then((data) => {
        console.log(data);
        console.log(this.props.removeFile({ id: e.target.value }));
      });
  }

  downLoadFile(e) {

  }

  render() {
		return (
      <Col className="backgroundStyle" xs={12} sm={6} md={6} lg={6}>
        <List>
          <Row>
            <Col xs={10}>
              <p>Files</p>
            </Col>
            <Col xs={2}>
              <IconButton
                onClick={this.openAddFileDlg.bind(this)}
                tooltip="add file"
                touch={true}
              >
                <AddFile />
              </IconButton>
            </Col>
          </Row>
          {this.props.documents.map(document => (
            <Row key={document.id} >
              <Col xs={10}>
                <ListItem
                  key={document.id}
                  leftAvatar={<Avatar icon={<FileIcon />} />}
                  primaryText={
                    <Row>
                      <Col xs={10}>
                        {document.name}
                      </Col>
                    </Row>
                  }
                />
              </Col>
              <Col xs={1}>
                <IconButton
                  value={document.id}
                  style={{
                    backgroundColor: 'inherit',
                    backgroundImage: 'url(' + 'https://cdn1.iconfinder.com/data/icons/material-core/24/cloud-download-24.png' + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                  onTouchTap={this.downLoadFile.bind(this)}

                >
                </IconButton>
              </Col>
              <Col xs={1}>
                <IconButton
                  value={document.id}
                  style={{
                    backgroundColor: 'inherit',
                    backgroundImage: 'url(' + 'https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_delete_48px-24.png' + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                  onTouchTap={this.deleteFile.bind(this)}
                >
                </IconButton>
              </Col>
            </Row>
          ))}
        </List>
        <AddFileDlg
          projectId={this.props.projectId}
          open={this.state.addFileOpen}
          closeDlg={this.openAddFileDlg.bind(this)}
          addFile={this.addFile.bind(this)}
        />
    </Col>
    );
  }
}
