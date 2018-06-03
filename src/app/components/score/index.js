import React from 'react';
import PropTypes from 'prop-types';
import ScoreLine from '../scoreLine/index';

const Score = (props) => {

    return (
        <div id="topScore" >
            <h3>Top score</h3>
            <table>
                <thead>
                    <tr>
                        <th>Level</th>
                        <th>Time</th>
                        <th>Times completed</th>
                    </tr>
                </thead>
                <tbody>
                    {props.levelsCompleted.reverse().map((row, i) =>
                        <ScoreLine
                            key={i}
                            index={i}
                            name={row.name}
                            times={row.times}
                        />
                    )}
                </tbody>
            </table>
        </div>
    )
}

Score.propTypes = {
    levelsCompleted: PropTypes.array,
};

export default Score;