import React from 'react';
import PropTypes from 'prop-types';

const Cell = (props) => {

  let divClass = () => {
    if(props.visitedFields.includes(props.item)){
        return "visited"
      }
    if(props.remainingFields.includes(props.item)){
        return "remaining"
      } 
      return "cell"
    }
    
    return (
      <div 
        id={props.activeFields.includes(props.item) ? "active" : "cell"}
        className={divClass()}
        onClick={() => { props.handleSelectFirstField(props.item) }}
        >
      </div>
    );
  }

  Cell.propTypes = {
    item: PropTypes.string,
    remainingFields: PropTypes.array,
    handleSelectFirstField: PropTypes.func,
    activeFields: PropTypes.array,
};

export default Cell;