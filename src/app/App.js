import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from './components/table/index';
import { createGame } from '../utils/gameConfig';
import { gameOptions } from '../utils/constants';

import {
  selectLevel,
  selectFirstField,
  newGame,
  activateFields,
  playGame
} from './actions/appActions'

class App extends React.Component {

  createLevelOptions = () => {
    let options = [];
    for (let i = 1; i < this.props.maxLevel; i++) {
      let option = <option key={i} value={i}>
        level {i}
      </option>
      options.push(option);
    }
    return options;
  }

  handleLevelSelect = (event) => {
    this.props.onLevelSelected(parseInt(event.target.value));
  }

  handleSelectFirstField = (firstField) => {
    var visitedFields = this.props.visitedFields
    if (this.props.game.length === 0) {
      this.props.onSelectFirstField(firstField);
      var game = createGame(firstField, this.props.levelSelected, gameOptions, [firstField]);
      this.props.onCreateGame(game)
    } else {
      let activeFields = this.props.game.filter(element => {
        let a = Math.abs(parseInt(element[0]) - parseInt(firstField[0]));
        let b = Math.abs(parseInt(element[1]) - parseInt(firstField[1]));
        let br = a.toString() + b.toString()
        if (br == '03' || br == '30' || br == '22') {
          return true;
        } else {
          return false;
        }
      });
      this.props.onActivateFields(activeFields);
      if (this.props.activeFields.includes(firstField)) {
        game = this.props.game.filter(element => element !== firstField)
        this.props.onCreateGame(game)
        visitedFields.push(firstField);
        this.props.onPlayingGame(visitedFields);
      }
    }
  }



  render() {

    return (
      <React.Fragment>
        <Table
          handleSelectFirstField={this.handleSelectFirstField}
          game={this.props.game}
          activeFields={this.props.activeFields}
          visitedFields={this.props.visitedFields}
        />
        <select name="level" onChange={this.handleLevelSelect} >
          {this.createLevelOptions()}
        </select>
        <div>You are playing level {this.props.levelSelected}</div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  onLevelSelected: PropTypes.func,
  onSelectFirstField: PropTypes.func,
  onCreateGame: PropTypes.func,
  onActivateFields: PropTypes.func,
  onPlayingGame: PropTypes.func
};

const mapStateToProps = state => {
  return {
    levelSelected: state.appReducer.levelSelected,
    maxLevel: state.appReducer.maxLevel,
    firstField: state.appReducer.firstField,
    game: state.appReducer.game,
    activeFields: state.appReducer.activeFields,
    visitedFields: state.appReducer.visitedFields
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLevelSelected: (level) => dispatch(selectLevel(level)),
    onSelectFirstField: (field) => dispatch(selectFirstField(field)),
    onCreateGame: (game) => dispatch(newGame(game)),
    onActivateFields: (activeFields) => dispatch(activateFields(activeFields)),
    onPlayingGame: (visitedFields) => dispatch(playGame(visitedFields)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
