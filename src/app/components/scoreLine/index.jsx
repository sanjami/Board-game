import React from 'react';
import PropTypes from 'prop-types';

class ScoreLine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTimes: false,
    };
  }

    showTimes = () => {
      this.setState({ showTimes: true });
    }

    hideTimes = () => {
      this.setState({ showTimes: false });
    }

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
                        times.map(time =>
                          <p key={name + time}>{`${time} seconds`}</p>)
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
  index: PropTypes.number,
  name: PropTypes.number,
  times: PropTypes.array,
};

export default ScoreLine;
