import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from './components/table/index';
import { createGame } from '../utils/gameConfig';
import { gameOptions } from '../utils/constants';
import Modal from 'react-modal';

import {
  selectLevel,
  newGame,
  activateFields,
  playGame,
  nextGame
} from './actions/appActions'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

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

  startGame = (field) => {
    var game = createGame(field, this.props.levelSelected, gameOptions, [field]);
    this.props.onCreateGame(game)
    
    var visitedFields = this.props.visitedFields
      visitedFields.push(field);
      this.props.onPlayingGame(visitedFields);

      let activeFields = game.filter(element => {
        let a = Math.abs(parseInt(element[0]) - parseInt(field[0]));
        let b = Math.abs(parseInt(element[1]) - parseInt(field[1]));
        let br = a.toString() + b.toString()
        if (br == '03' || br == '30' || br == '22') {
          return true;
        } else {
          return false;
        }
      });

      this.props.onActivateFields(activeFields);

      game = game.filter(element => element !== field);
      this.props.onCreateGame(game);
  }

  handleLevelSelect = (event) => {
    this.props.onLevelSelected(parseInt(event.target.value));
  }

  handleNextGame = () => { 
    this.closeModal()
    this.props.onPlayingGame([]);
    var level = localStorage.getItem('maxLevel');
    this.props.onNextGame(parseInt(level)+1);    
  }

  handleSameGame = () => { 
    this.closeModal()
    this.props.onPlayingGame([]);
    var level = localStorage.getItem('maxLevel');
    this.props.onNextGame(parseInt(level));    
  }

  handleSelectFirstField = (field) => {
    
    if ((this.props.game.length === 0) && (this.props.visitedFields.length === 0)) {
      this.startGame(field);

    } else if ((this.props.visitedFields.length !== 0) && (this.props.activeFields.length !== 0)) {
      if (this.props.activeFields.includes(field)) {
        var game = this.props.game.filter(element => element !== field)
        this.props.onCreateGame(game)
        var visitedFields = this.props.visitedFields;
         visitedFields.push(field);
        this.props.onPlayingGame(visitedFields);
        let activeFields = game.filter(element => {
          let a = Math.abs(parseInt(element[0]) - parseInt(field[0]));
          let b = Math.abs(parseInt(element[1]) - parseInt(field[1]));
          let br = a.toString() + b.toString()
          if (br == '03' || br == '30' || br == '22') {
            return true;
          } else {
            return false;
          }
        });
        
        if(activeFields.length === 0 && game.length > 0){
          // this.openModal();
        } else if (activeFields.length === 0 && game.length === 0) {
          localStorage.setItem('maxLevel', this.props.levelSelected);
          this.openModal();
        }
        this.props.onActivateFields(activeFields);
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

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>You have complited level {this.props.level}</h2>
          <button onClick={this.closeModal}>close</button>
          <div>Do you want to play next level?</div>
            <button onClick={this.handleNextGame}>yes</button>
            <button onClick={this.handleSameGame}>no</button>
        </Modal>

      </React.Fragment>
    );
  }
}

App.propTypes = {
  onLevelSelected: PropTypes.func,
  onCreateGame: PropTypes.func,
  onActivateFields: PropTypes.func,
  onPlayingGame: PropTypes.func,
  onNextGame: PropTypes.func
};

const mapStateToProps = state => {
  return {
    levelSelected: state.appReducer.levelSelected,
    maxLevel: state.appReducer.maxLevel,
    game: state.appReducer.game,
    activeFields: state.appReducer.activeFields,
    visitedFields: state.appReducer.visitedFields,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLevelSelected: (level) => dispatch(selectLevel(level)),
    onCreateGame: (game) => dispatch(newGame(game)),
    onActivateFields: (activeFields) => dispatch(activateFields(activeFields)),
    onPlayingGame: (visitedFields) => dispatch(playGame(visitedFields)),
    onNextGame: (level) => dispatch(selectLevel(level))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
