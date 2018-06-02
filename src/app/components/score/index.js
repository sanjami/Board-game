import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Score extends React.Component {
    constructor() {
        super()

        this.state = {
            showTimes: false,
        }
    }

    handleShowTimes = () => {
        this.setState((prevState) => ({
            showTimes: !prevState.showTimes,
        }))
    }

    render() {

        return (
            <div id="topScore" >
                <table className="MyClassName">
                    <thead>
                        <tr>
                            <th>level</th>
                            <th>time</th>
                            <th>times completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.levelsCompleted.map((row, i) =>
                            <tr key={i} id={i}>
                                <td>{`Level ${row.name}`}</td>
                                <td onClick={this.handleShowTimes} id={row.name}>
                                    {`${Math.max(...row.times)} seconds`}
                                    <ul className={this.state.showTimes ? "visible" : "invisible"}>
                                        {row.times.map((time, j) => <li key={i+j}>{`${time} seconds`}</li>)}
                                    </ul>
                                </td>
                                <td>{row.times.length}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

Score.propTypes = {
    levelsCompleted: PropTypes.array,
};


export default Score;