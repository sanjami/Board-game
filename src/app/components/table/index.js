import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cell from '../cell/index';
import { tableArr } from '../../../utils/constants'


const Table = (props) => {
    
    let content = tableArr.map((item, index) => (
        <Cell
            key={item}
            item={item}
            handleSelectFirstField={props.handleSelectFirstField}
            game={props.game}
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
    game: PropTypes.array,
    handleSelectFirstField: PropTypes.func,
    activeFields: PropTypes.array,
    visitedFields: PropTypes.array
};


export default Table;