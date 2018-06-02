import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Table from './components/table/index';
import Score from './components/score/index';
import { createGame } from '../utils/createGame';
import { moveOptions } from '../utils/constants';
import { minLevel } from '../utils/gameConfig';
import { checkActiveFields } from '../utils/utils';
import LevelCompleted from '../entities/levelCompleted'

import {
  setLevel,
  setMaxLevel,
  setMinLevel,
  setRemainingFields,
  setActiveFields,
  setVisitedFields,
  setLives,
  resetGame,
  setLevelsCompleted
} from './actions/appActions'

class App extends React.Component {

  state = {
      modalIsOpen: false,
      modalType: '',
      time: 0,
    };
  

  componentDidMount() {
    let maxLevel = localStorage.getItem('maxLevel');
    this.props.onSetMaxLevel(maxLevel && (maxLevel > minLevel) ? parseInt(maxLevel) : minLevel);
    this.props.onSetMinLevel(minLevel);
    this.handleNoModal()
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  openModal = (type) => {
    this.setState({ modalIsOpen: true, modalType: type });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false, modalType: '' });
  }

  createLevelOptionsMenu = () => {
    let options = [];
    for (let i = this.props.minLevel; i <= this.props.maxLevel; i++) {
      let option = <option key={i} value={i}>
        level {i}
      </option>
      options.push(option);
    }
    return options;
  }


  startGame = (field) => {

    let remainingFields = createGame(field, this.props.currentLevel, moveOptions, [field]);

    let visitedFields = [];
    visitedFields.push(field);
    this.props.onSetVisitedFields(visitedFields);

    let activeFields = checkActiveFields(remainingFields, field);
    this.props.onSetActiveFields(activeFields);

    remainingFields = remainingFields.filter(element => element !== field);
    this.props.onSetRemaningFields(remainingFields);
  }

  handleLevelSelect = (event) => {
    this.props.onSetLevel(parseInt(event.target.value));
  }

  handlePlayNextLevel = () => {
    this.closeModal()
    this.props.onResetGame();
    this.props.onSetLevel(this.props.currentLevel + 1);
    let lives = localStorage.getItem('lives');
    this.props.onSetLives(parseInt(lives))
  }

  handlePlaySameLavel = () => {
    this.closeModal()
    this.props.onResetGame();
    let maxLevel = localStorage.getItem('maxLevel');
    this.props.onSetMaxLevel(parseInt(maxLevel));
    let lives = localStorage.getItem('lives');
    this.props.onSetLives(parseInt(lives))
  }

  handleNoModal = () => {
    this.props.onResetGame();
    let maxLevel = localStorage.getItem('maxLevel');
    this.props.onSetMaxLevel(maxLevel && (maxLevel > minLevel) ? parseInt(maxLevel) : minLevel);
    let lives = localStorage.getItem('lives');
    this.props.onSetLives(lives ? parseInt(lives) : 0);
    this.openModal('newGame');
  }

  tick = () => {
    this.setState((prevState) => ({
      time: prevState.time + 1,
    }));
  }

  resetTimer = () => {
    this.setState({
      time: 0
    })
  }

  handleSelectFirstField = (field) => {

    if ((this.props.remainingFields.length === 0) && (this.props.visitedFields.length === 0)) {

      this.startGame(field);

      this.timer = setInterval(() => {
        this.tick();
      }, 1000);

    } else if ((this.props.visitedFields.length !== 0) && (this.props.activeFields.length !== 0)) {
      if (this.props.activeFields.includes(field)) {
        let remainingFields = this.props.remainingFields.filter(element => element !== field)
        this.props.onSetRemaningFields(remainingFields)
        let visitedFields = this.props.visitedFields;
        visitedFields.push(field);
        this.props.onSetVisitedFields(visitedFields);
        let activeFields = checkActiveFields(remainingFields, field);

        if (activeFields.length === 0 && remainingFields.length > 0) {
          clearInterval(this.timer);
          this.resetTimer()

          if (this.props.lives > this.props.remainingFields.length) {
            localStorage.setItem('lives', this.props.lives - remainingFields.length)
          } else {
            localStorage.setItem('lives', 0);
            localStorage.setItem('maxLevel', this.props.minLevel);
            this.props.onSetLevel(this.props.minLevel);
          }
          this.openModal('lost');

        } else if (activeFields.length === 0 && remainingFields.length === 0) {
          clearInterval(this.timer);
          localStorage.setItem('lives', this.props.lives + 1);

          var existingLevels = JSON.parse(localStorage.getItem('levelsCompleted'));

          if (existingLevels) {
            if (existingLevels.filter(element => element.name === this.props.currentLevel).length > 0) {
              let newArr = existingLevels.map(element => {
                if (element.name === this.props.currentLevel) {
                  element.times.push(this.state.time)
                }
                return element
              });

              localStorage.setItem('levelsCompleted', JSON.stringify(newArr));
              this.props.onSetLevelsCompleted(newArr);

            } else {

              let levelCompleted = new LevelCompleted(this.props.currentLevel);
              levelCompleted.addTime(this.state.time);
              localStorage.setItem('levelsCompleted', JSON.stringify([...existingLevels, levelCompleted]));
              this.props.onSetLevelsCompleted([...existingLevels, levelCompleted]);
            }
          }
          else {
            let levelCompleted = new LevelCompleted(this.props.currentLevel);
            levelCompleted.addTime(this.state.time);
            localStorage.setItem('levelsCompleted', JSON.stringify([levelCompleted]));
            this.props.onSetLevelsCompleted([levelCompleted]);
          }

          let maxLevel = localStorage.getItem('maxLevel');
          if (maxLevel < this.props.currentLevel) {
            localStorage.setItem('maxLevel', this.props.currentLevel)
          }
          this.resetTimer();
          this.openModal('winning');
        }
        this.props.onSetActiveFields(activeFields);
      }
    }
  }

  

  renderWinningModal = () => {
    return (
      <Modal
        className="modal"
        isOpen={this.state.modalIsOpen}
      >
        <h2 ref={subtitle => this.subtitle = subtitle}>You have completed level: {this.props.currentLevel}</h2>
        <div>Do you want to play next level?</div>
        <button className="modalButton" onClick={this.handlePlayNextLevel}>yes</button>
        <button className="modalButton" onClick={this.handleNoModal}>no</button>
      </Modal>
    )
  }

  renderLostModal = () => {
    return (
      <Modal
        className="modal"
        isOpen={this.state.modalIsOpen}
      >
        <h2 ref={subtitle => this.subtitle = subtitle}>End game</h2>
        <div>You have lost this game. Do you want to play again?</div>
        <button className="modalButton" onClick={this.handlePlaySameLavel}>yes</button>
        <button className="modalButton" onClick={this.handleNoModal}>no</button>
      </Modal>
    )
  }

  renderNewGameModal = () => {
    return (
      <Modal
        className="modal"
        isOpen={this.state.modalIsOpen}
      >
        <h2 ref={subtitle => this.subtitle = subtitle}>Play new game</h2>
        <div>Select level:</div>
        <select name="level" onClick={this.handleLevelSelect} >
          {this.createLevelOptionsMenu()}
        </select>
        <button className="modalButton" onClick={this.closeModal}>start</button>
        <button className="modalButton" onClick={this.closeModal}>no</button>
      </Modal>
    )
  }

  renderModalComponent = () => {
    switch (this.state.modalType) {
      case "winning": return this.renderWinningModal();
      case "lost": return this.renderLostModal();
      case "newGame": return this.renderNewGameModal();
    }
  }


  render() {
    return (
      <React.Fragment>
        <Table id="table"
          handleSelectFirstField={this.handleSelectFirstField}
          remainingFields={this.props.remainingFields}
          activeFields={this.props.activeFields}
          visitedFields={this.props.visitedFields}
        />
        <div id="stat">
          <div>You are playing level {this.props.currentLevel}</div>
          <div>Time: {this.state.time}</div>
          <div>Left to click: {this.props.remainingFields.length}</div>
          <div>Lives: {this.props.lives}</div>
        </div>
      <Score 
      levelsCompleted={this.props.levelsCompleted}
      />
        {this.renderModalComponent()}
      </React.Fragment>
    );
  }
}

App.propTypes = {
  onSetLevel: PropTypes.func,
  onSetMaxLevel: PropTypes.func,
  onSetMinLevel: PropTypes.func,
  onSetRemaningFields: PropTypes.func,
  onSetActiveFields: PropTypes.func,
  onSetVisitedFields: PropTypes.func,
  onSetLives: PropTypes.func,
  onSetLevelsCompleted: PropTypes.func,
  onResetGame: PropTypes.func,
  currentLevel : PropTypes.number,
  maxLevel: PropTypes.number,
  remainingFields: PropTypes.array,
  activeFields: PropTypes.array,
  visitedFields: PropTypes.array,
  lives: PropTypes.number,
  levelsCompleted: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currentLevel: state.appReducer.currentLevel,
    maxLevel: state.appReducer.maxLevel,
    minLevel: state.appReducer.minLevel,
    remainingFields: state.appReducer.remainingFields,
    activeFields: state.appReducer.activeFields,
    visitedFields: state.appReducer.visitedFields,
    lives: state.appReducer.lives,
    levelsCompleted: state.appReducer.levelsCompleted
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetLevel: (level) => dispatch(setLevel(level)),
    onSetMaxLevel: (maxLevel) => dispatch(setMaxLevel(maxLevel)),
    onSetMinLevel: (minLevel) => dispatch(setMinLevel(minLevel)),
    onSetRemaningFields: (remainingFields) => dispatch(setRemainingFields(remainingFields)),
    onSetActiveFields: (activeFields) => dispatch(setActiveFields(activeFields)),
    onSetVisitedFields: (visitedFields) => dispatch(setVisitedFields(visitedFields)),
    onSetLives: (lives) => dispatch(setLives(lives)),
    onResetGame: () => dispatch(resetGame()),
    onSetLevelsCompleted: (levelCompleted) => dispatch(setLevelsCompleted(levelCompleted))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
