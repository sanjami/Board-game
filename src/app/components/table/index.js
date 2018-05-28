import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cell from '../cell/index';
import { tableArr } from '../../../utils/constants'


class Table extends React.Component {

    render() {
        let content = tableArr.map((item, index) => (
            <Cell
              key={item}
              item={item}
              handleSelectFirstField={this.props.handleSelectFirstField}
              game={this.props.game}
              activeFields={this.props.activeFields}
              visitedFields={this.props.visitedFields}
            />
          ));
        return <div id="table">
                {content}
            </div>
    }
}

// table.propTypes = {
//     id: PropTypes.number
// };

function mapStateToProps(state) {
    return {
        // stuffs: state.stuffs
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // stuffActions: bindActionCreators(stuffActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Table);