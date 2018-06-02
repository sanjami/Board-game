import React from 'react';
import PropTypes from 'prop-types';

 class ScoreLine extends React.Component {

    state = {
        showTimes: false,
    }

    showTimes = () => {
        this.setState({showTimes: true})
    }

    hideTimes = () => {
        this.setState({showTimes: false})
    }

    render() {
        const { index, name, times } = this.props

        return (
            <tr key={index}>
                <td>
                    {`Level ${name}`}
                </td>
                <td>
                    {`${Math.min(...times)} seconds`}{' '}

                    <button
                        onClick={this.showTimes}
                        className={this.state.showTimes ? "invisible" : "visible"}
                    >
                        +
                    </button>

                    <div className={this.state.showTimes ? "visible" : "invisible"}>
                        {
                            times.map((time, j) => 
                                <p key={index + j}>{`${time} seconds`}</p>)
                        }
                        <button onClick={this.hideTimes}>X</button>
                    </div>
                </td>
                <td>
                    {times.length}
                </td>
            </tr>
        )
    }
}

ScoreLine.propTypes = {
    index: PropTypes.number,
    name: PropTypes.number,
    times: PropTypes.array,
};

export default ScoreLine;