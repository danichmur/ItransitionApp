import React from 'react';
import Hash from 'sha256';
import {
  Divider,
  Chip,
  MenuItem,
  IconButton,
  IconMenu,
}  from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Grid,Row,Col } from 'react-flexbox-grid';
import EditInfoDlg from '../Dialogs/EditInfoDlg'
import Chips from '../../Chips/Chips';
import ProjectApi from '../../../Api/ProjectApi';
import { Redirect } from 'react-router-dom';
export default class ProjectInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      project: {
        name: '',
        description: '',
        tags: [],
      },
      editInfoOpen:false,
    }
  };

  getChangedData(data) {
    this.props.sendChangedData(data);
  };

  openEditInfoDlg() {
    this.setState({editInfoOpen: !this.state.editInfoOpen});
  };

  changeActive() {
    ProjectApi.updateProject(this.props.project.id, {
      name: this.props.project.name,
      description: this.props.project.description,
      active: !this.props.project.active,
      user_id: parseInt(localStorage.getItem('userId'))
    }).then(this.props.changeActive());

  }

  deleteProject() {
    ProjectApi.deleteProject(this.props.project.id)
      .then(this.setState({project: null}));
  }


  render() {
    if(this.state.project == null) {
      return(<Redirect to='/main' />)
    } else {
  		return (
        <Col className="backgroundStyle" xs={12} sm={7} md={8} lg={8}>
          <EditInfoDlg
            open={this.state.editInfoOpen}
            projectInfo={this.props.project}
            openDlg={this.openEditInfoDlg.bind(this)}
            sendData={this.getChangedData.bind(this)}
          />
          <Row>
            <Col xs={10} sm={11}>
              <h1>{this.props.project.name}</h1>
            </Col>
            <Col xs={2} sm={1}>
            {(this.props.userPosition == 0 || this.props.userPosition == 1) ? (
              this.props.project.active ?
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  <MenuItem
                    primaryText="Freeze"
                    onTouchTap={this.changeActive.bind(this)}
                  />
                  <Divider />
                  <MenuItem
                    primaryText="Edit"
                    onTouchTap={this.openEditInfoDlg.bind(this)}
                  />
                  <Divider />
                  <MenuItem
                    primaryText="Delete"
                    onTouchTap={this.deleteProject.bind(this)}
                   />
                </IconMenu>
              : <IconMenu
                 iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                 anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                 targetOrigin={{horizontal: 'right', vertical: 'top'}}
               >
                 <MenuItem
                   onTouchTap={this.changeActive.bind(this)}
                   primaryText="Unfreeze"
                 />
              </IconMenu>
            ): null}
            </Col>
          </Row>
            <Chips tags={this.props.project.tags}/>
          <Row>
            <p>{this.props.project.description}</p>
          </Row>
        </Col>
      );
    }
  }
}
