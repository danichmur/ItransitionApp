import React from 'react';
import { Row } from 'react-flexbox-grid';
import { Chip }  from 'material-ui';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';



export default class Chips extends React.Component {

  constructor(props) {
    super(props);
    this.styles = {
      chip: {
        margin: 5,
      },
    }
    this.state = {
      redirect: false,
      tagId: null
    }
  };

  handleRequestDelete(id) {
    this.props.deleteTag(id);
  };

  clickChips(e) {
    this.setState({redirect: true, tagId:e});
  }

  render() {
    if (this.state.redirect) {
      this.state.redirect = false;
      return <Redirect push to={{
        pathname:`/tags/${this.state.tagId}/allprojects`,
        state: {id: `${this.state.tagId}`}
      }}

      />;
    } else {
      const edit = this.props.edit;
      return (
        <Row>
          {this.props.tags.map((tag) => (
            edit ?
              <Chip
                style={this.styles.chip}
                key={tag.id}
                onRequestDelete={() => this.handleRequestDelete(tag.id)}
              >
                {tag.value}
              </Chip>
            :
              <Chip
                key={tag.id}
                style={this.styles.chip}
                onTouchTap={() => this.clickChips(tag.id)}
              >
                {tag.value}
              </Chip>
          ))}
        </Row>
      );
    }
  }
}
