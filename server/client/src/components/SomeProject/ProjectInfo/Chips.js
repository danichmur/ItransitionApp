import React from 'react';
import { Row } from 'react-flexbox-grid';
import { Chip }  from 'material-ui';

export default class Chips extends React.Component {

  constructor(props) {
    super(props);
    this.styles = {
      chip: {
        margin: 5,
      },
    }
  };

  handleRequestDelete(id) {
    this.props.deleteTag(id);
  }
  render() {
    const edit = this.props.edit;
    return (
      <Row>
        {this.props.tags.map(tag => (
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
            style={this.styles.chip}
            key={tag.id}
          >
            {tag.value}
          </Chip>
        ))}
      </Row>
    );
  }
}
