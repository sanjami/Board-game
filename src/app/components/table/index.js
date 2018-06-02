import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cell from '../cell/index';
import { board } from '../../../utils/constants'


const Table = (props) => {
    
    let content = board.map((item, index) => (
        <Cell
            key={item}
            item={item}
            handleSelectFirstField={props.handleSelectFirstField}
            remainingFields={props.remainingFields}
            activeFields={props.activeFields}
            visitedFields={props.visitedFields}
        />
    ));

    return (
    <div id="table">
        {content}
    </div>
    )
}

Table.propTypes = {
    remainingFields: PropTypes.array,
    handleSelectFirstField: PropTypes.func,
    activeFields: PropTypes.array,
    visitedFields: PropTypes.array
};


export default Table;