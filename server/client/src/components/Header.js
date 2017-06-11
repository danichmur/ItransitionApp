import React from 'react';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


export default class Header extends React.Component {
  leftButtonTouch() {
    this.props.showDrawer();
  }
  render() {
    return (
        <AppBar
          title="Project-Manager"
          onLeftIconButtonTouchTap={this.leftButtonTouch.bind(this)}
        />
    );
  }
}
