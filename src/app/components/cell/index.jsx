import React from 'react';
import PropTypes from 'prop-types';

class Cell extends React.Component {
  // avoid aditional rendering, render only fields that are in the game
  shouldComponentUpdate() {
    if ((this.props.remainingFields.length === 0) || this.props.remainingFields.includes(this.props.item) || this.props.visitedFields.includes(this.props.item) || this.props.activeFields.includes(this.props.item)) {
      return true;
    }
    return false;
  }

  // change class depending on status of the field, main visible logic of game

  divClass = () => {
    if (this.props.visitedFields.includes(this.props.item)) {
      return 'visited';
    }
    if (this.props.remainingFields.includes(this.props.item)) {
      return 'remaining';
    }
    return 'cell';
  }

  render() {
    return (
      <div
        id={this.props.activeFields.includes(this.props.item) ? 'active' : 'cell'}
        className={this.divClass()}
        onClick={() => { this.props.handleSelectFirstField(this.props.item); }}
      />
    );
  }
}

Cell.propTypes = {
  item: PropTypes.string,
  remainingFields: PropTypes.array,
  activeFields: PropTypes.array,
  visitedFields: PropTypes.array,
  handleSelectFirstField: PropTypes.func,
};

export default Cell;
