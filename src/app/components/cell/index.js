import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import {
  cellClicked
} from '../../actions/cellActions';


class Cell extends React.Component {

  handleCellClicked = (event) => {
    console.log(event.currentTarget)
    this.props.onCellClicked(event.currentTarget);
  }

  divClass = () => {
    if(this.props.game.includes(this.props.item)){
        return "yellow"
      } else if(this.props.visitedFields.includes(this.props.item)){
        return "green"
      } else {
      return "cell"
    }
  }

  render() {
    return (
      <div id={this.props.activeFields.includes(this.props.item) ? "active" : "cell"}
        className={this.divClass()}
        onClick={() => { this.props.handleSelectFirstField(this.props.item) }}>
        {this.props.item}
      </div>
    );
  }
}

Cell.propTypes = {
  onCellClicked: PropTypes.func
};

const mapStateToProps = state => {
  return {
    cellSelected: state.cellReducer.cellSelected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCellClicked: (position) => dispatch(cellClicked(position)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cell);