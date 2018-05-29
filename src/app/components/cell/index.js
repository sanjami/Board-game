import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Cell = (props) => {

  let divClass = () => {
    if(props.visitedFields.includes(props.item)){
        return "green"
      }
    if(props.game.includes(props.item)){
        return "yellow"
      } 
      return "cell"
    }
    
    return (
      <div 
        id={props.activeFields.includes(props.item) ? "active" : "cell"}
        className={divClass()}
        onClick={() => { props.handleSelectFirstField(props.item) }}>
          {props.item}
      </div>
    );
  }

  Cell.propTypes = {
    item: PropTypes.string,
    game: PropTypes.array,
    handleSelectFirstField: PropTypes.func,
    activeFields: PropTypes.array,
};

export default Cell;