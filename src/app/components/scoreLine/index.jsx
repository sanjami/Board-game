import React from 'react';
import PropTypes from 'prop-types';

class ScoreLine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTimes: false,
    };
  }

  // handlers functions for showing aditional times

    showTimes = () => {
      this.setState({ showTimes: true });
    }

    hideTimes = () => {
      this.setState({ showTimes: false });
    }

  // return one row for statistic table with times for one level

    render = () => {
      const { name, times } = this.props;

      return (
        <tr key={name}>
          <td>
            {`Level ${name}`}
          </td>
          <td>
            {`${Math.min(...times)} seconds`}{' '}

            <button
              onClick={this.showTimes}
              className={this.state.showTimes ? 'invisible' : 'plus'}
            >
                    +
            </button>

            <div className={this.state.showTimes ? 'visible' : 'invisible'}>
              {
                        times.map((time, index) =>
                          <p key={`${time}${index}`}>{`${time} seconds`}</p>)
                    }
              <button onClick={this.hideTimes} className="hide">X</button>
            </div>
          </td>
          <td>
            {times.length}
          </td>
        </tr>
      );
    }
}

ScoreLine.propTypes = {
  name: PropTypes.number,
  times: PropTypes.array,
};

export default ScoreLine;
