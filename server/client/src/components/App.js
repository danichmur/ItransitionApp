import React from 'react';
import Content from './Content'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  cyan500, cyan700,
  grey100, grey300, grey400, grey500, grey600, grey900,
  white,fullWhite,
  darkBlack, fullBlack,
  yan700,
 pinkA100, pinkA200, pinkA400
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

const blackBaseTheme = {
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: cyan700,
    primary2Color: cyan700,
    primary3Color: grey600,
    accent1Color: pinkA200,
    accent2Color: pinkA400,
    accent3Color: pinkA100,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
  containerFluid:{
    color: 'red',
    height:'400px'
  }
}
const lightBaseTheme = {
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: '#24292e',
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },

};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: getMuiTheme(lightBaseTheme)
    }
  }
  changeTheme(data) {
    data ? this.state.theme = getMuiTheme(blackBaseTheme) :
      this.state.theme = getMuiTheme(lightBaseTheme);
    this.setState({ theme: this.state.theme })
  }
	render() {
		return (
			<div>
				<MuiThemeProvider muiTheme={this.state.theme}>
					<Content changeTheme={this.changeTheme.bind(this)}/>
				</MuiThemeProvider>
			</div>
		);
	}
}
