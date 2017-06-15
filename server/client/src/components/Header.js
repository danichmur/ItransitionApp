import React from 'react';
import { AppBar,IconButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import LogInIcon from 'material-ui/svg-icons/action/account-circle';
import LogOutIcon from 'material-ui/svg-icons/action/exit-to-app';


injectTapEventPlugin();


export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.style = {
      appBar:{
          position:'fixed',
           top: 0,
      },
      iconStyle: {
        width: 40,
        height: 40,
      },
      buttonStyle: {
        marginRight: 50,
      }
    }
  };

  leftButtonTouch(e) {
    this.props.showDrawer();
  };
  
  render() {
    const style = this.style;
    return (
        <AppBar
          style={style.appBar}
          title="Project-Manager"
          onLeftIconButtonTouchTap={this.leftButtonTouch.bind(this)}
          iconElementRight={
            <IconButton
              href="../logIn"
              iconStyle={style.iconStyle}
              style={style.buttonStyle}
            >
              <LogInIcon />
            </IconButton>
          }
        />
    );
  }
}
