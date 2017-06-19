import React from 'react';
import { AppBar,IconButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import LogInIcon from 'material-ui/svg-icons/action/account-circle';
import LogOutIcon from 'material-ui/svg-icons/action/exit-to-app';
import { Link } from 'react-router-dom';

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

  logOut() {
    this.props.logOut();
  }

  renderIconButton() {

    const style = this.style;
    let href = null;
    let component = null;

    if (this.props.isAuthenticated) {
      return(
        <IconButton
          href={href}
          onTouchTap={this.logOut.bind(this)}
          iconStyle={style.iconStyle}
          style={style.buttonStyle}
        >
           <LogOutIcon />
        </IconButton>
      )
    } else {
      return(
        <IconButton
          href="../logIn"
          iconStyle={style.iconStyle}
          style={style.buttonStyle}
        >
          <LogInIcon />
        </IconButton>
      )
    }
  }
  render() {
    const style = this.style;
    return (
        <AppBar
          style={style.appBar}
          title={
            <Link className="title" to='/main'>Project-Manager</Link>
          }
          onLeftIconButtonTouchTap={this.leftButtonTouch.bind(this)}
          iconElementRight={
            this.renderIconButton()
          }
        />
    );
  }
}
