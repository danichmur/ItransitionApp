import React from 'react';
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
import Chips from './Chips';

export default class ProjectInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      project: {
        name: this.props.project.name,
        description: this.props.project.description,
        tags:this.props.project.tags,
      },
      editInfoOpen:false,
    }
  };

  getChangedData(data){
    this.setState({project:{
      name: data.name,
      description: data.description,
      tags: data.tags,
    }});

  };

  openEditInfoDlg(){
    this.setState({editInfoOpen: !this.state.editInfoOpen});
  };

  render() {
		return (
      <Col className="backgroundStyle" xs={12} sm={7} md={8} lg={8}>
        <EditInfoDlg
          open={this.state.editInfoOpen}
          projectInfo={this.state.project}
          openDlg={this.openEditInfoDlg.bind(this)}
          sendData={this.getChangedData.bind(this)}
        />
        <Row>
          <Col xs={10} sm={11}>
            <h1>{this.state.project.name}</h1>
          </Col>
          <Col xs={2} sm={1}>
            {this.props.project.active ?
              <IconMenu
                 iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                 anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                 targetOrigin={{horizontal: 'right', vertical: 'top'}}
               >
                <MenuItem primaryText="Freeze" />
                 <Divider />
                 <MenuItem
                   primaryText="Edit"
                   onTouchTap={this.openEditInfoDlg.bind(this)}
                 />
                 <Divider />
                 <MenuItem primaryText="Delete" />
              </IconMenu>
            :
            <IconMenu
               iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
               anchorOrigin={{horizontal: 'right', vertical: 'top'}}
               targetOrigin={{horizontal: 'right', vertical: 'top'}}
             >
               <MenuItem primaryText="Unfreeze" />
            </IconMenu>
            }
          </Col>
        </Row>
          <Chips tags={this.state.project.tags}/>
        <Row>
          <p>{this.state.project.description}</p>
        </Row>
      </Col>
    );
  }
}
