import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Table from './components/table/index';
import Score from './components/score/index';
import createGame from '../utils/createGame';
import { moveOptions } from '../utils/constants';
import settingsMinLevel from '../utils/gameConfig';
import checkActiveFields from '../utils/utils';
import LevelCompleted from '../entities/levelCompleted';

import {
  setLevel,
  setMaxLevel,
  setMinLevel,
  setRemainingFields,
  setActiveFields,
  setVisitedFields,
  setLives,
  resetGame,
  setLevelsCompleted,
} from './actions/appActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalType: '',
      time: 0,
    };
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount() {
    const { maxLevel } = this.props;
    this.props.onSetMaxLevel(maxLevel > settingsMinLevel ? parseInt(maxLevel, 10) : settingsMinLevel);
    this.props.onSetMinLevel(settingsMinLevel);
    this.handleNoModal();
  }


  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.modalIsOpen !== nextState.modalIsOpen || this.props !== nextProps) {
      return true;
    }
    return false;
  }

  openModal = (type) => {
    this.setState({ modalIsOpen: true, modalType: type });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false, modalType: '' });
  }

  createLevelOptionsMenu = () => {
    const { minLevel, maxLevel } = this.props;
    const options = [];
    for (let i = minLevel; i <= maxLevel; i += 1) {
      const option = (
        <option key={i} value={i}>
        level {i}
        </option>
      );
      options.push(option);
    }
    return options;
  }


  startGame = (field) => {
    const { currentLevel } = this.props;
    let remainingFields = createGame(field, currentLevel, moveOptions, [field]);

    const visitedFields = [];
    visitedFields.push(field);
    this.props.onSetVisitedFields(visitedFields);

    const activeFields = checkActiveFields(remainingFields, field);
    this.props.onSetActiveFields(activeFields);

    remainingFields = remainingFields.filter(element => element !== field);
    this.props.onSetRemaningFields(remainingFields);
  }

  handleLevelSelect = (event) => {
    this.props.onSetLevel(parseInt(event.target.value, 10));
  }

  handlePlayNextLevel = () => {
    this.closeModal();
    this.props.onResetGame();
    const { currentLevel } = this.props;
    this.props.onSetLevel(currentLevel + 1);
  }

  handlePlaySameLevel = () => {
    this.closeModal();
    this.props.onResetGame();
  }

  handleNoModal = () => {
    this.props.onResetGame();
    const { maxLevel } = this.props;
    this.newMethod().props.onSetMaxLevel(maxLevel > settingsMinLevel ? parseInt(maxLevel, 10) : settingsMinLevel);
    this.openModal('newGame');
  }

  newMethod = () => this

  tick = () => {
    this.setState(prevState => ({
      time: prevState.time + 1,
    }));
  }

  resetTimer = () => {
    this.setState({
      time: 0,
    });
  }

  handleSelectFirstField = (field) => {
    let {
      remainingFields, visitedFields, activeFields, lives,
    } = this.props;

    if ((remainingFields.length === 0) && (visitedFields.length === 0)) {
      this.startGame(field);

      this.timer = setInterval(() => {
        this.tick();
      }, 1000);
    } else if ((visitedFields.length !== 0) && (activeFields.length !== 0)) {
      if (activeFields.includes(field)) {
        remainingFields = remainingFields.filter(element => element !== field);
        this.props.onSetRemaningFields(remainingFields);
        visitedFields.push(field);
        this.props.onSetVisitedFields(visitedFields);
        const newActiveFields = checkActiveFields(remainingFields, field);

        if (newActiveFields.length === 0 && remainingFields.length > 0) {
          clearInterval(this.timer);
          this.resetTimer();

          if (lives > remainingFields.length) {
            this.props.onSetLives(lives - remainingFields.length);
          } else {
            this.props.onSetLives(0);
            const { minLevel } = this.props;
            this.props.onSetMaxLevel(minLevel);
            this.props.onSetLevel(minLevel);
          }
          this.openModal('lost');
        } else if (newActiveFields.length === 0 && remainingFields.length === 0) {
          clearInterval(this.timer);
          this.props.onSetLives(lives + 1);

          const { levelsCompleted, currentLevel } = this.props;
          const { time } = this.state;
          if (levelsCompleted) {
            if (levelsCompleted.filter(element => element.name === currentLevel).length > 0) {
              const newArr = levelsCompleted.map((element) => {
                if (element.name === currentLevel) {
                  element.times.push(time);
                  element.times.sort((a, b) => a > b);
                }
                return element;
              });

              this.props.onSetLevelsCompleted(newArr);
            } else {
              const levelCompleted = new LevelCompleted(currentLevel);
              levelCompleted.addTime(time);
              this.props.onSetLevelsCompleted([...levelsCompleted, levelCompleted]);
            }
          } else {
            const levelCompleted = new LevelCompleted(currentLevel);
            levelCompleted.addTime(time);
            this.props.onSetLevelsCompleted([levelCompleted]);
          }

          const { maxLevel } = this.props;
          if (maxLevel < currentLevel) {
            this.props.onSetMaxLevel(currentLevel);
          }
          this.resetTimer();
          this.openModal('winning');
        }
        this.props.onSetActiveFields(newActiveFields);
      }
    }
  }


  renderWinningModal = () => {
    const { currentLevel } = this.props;
    return (
      <Modal
        className="modal"
        isOpen={this.state.modalIsOpen}
      >
        <h2>You have completed level: {currentLevel}</h2>
        <div>Do you want to play next level?</div>
        <button className="modalButton" onClick={this.handlePlayNextLevel}>YES</button>
        <button className="modalButton" onClick={this.handleNoModal}>NO</button>
      </Modal>
    );
  }

  renderLostModal = () => (
    <Modal
      className="modal"
      isOpen={this.state.modalIsOpen}
    >
      <h2>End game</h2>
      <div>You have lost this game. Do you want to play again?</div>
      <button className="modalButton" onClick={this.handlePlaySameLevel}>YES</button>
      <button className="modalButton" onClick={this.handleNoModal}>NO</button>
    </Modal>
  )

  renderNewGameModal = () => (
    <Modal
      className="modal"
      isOpen={this.state.modalIsOpen}
    >
      <h2>Play new game</h2>
      <div>Select level:</div>
      <select name="level" onClick={this.handleLevelSelect} >
        {this.createLevelOptionsMenu()}
      </select>
      <button className="modalButton" onClick={this.closeModal}>START</button>
      <button className="modalButton" onClick={this.closeModal}>CANCEL</button>
    </Modal>
  )

  renderModalComponent = () => {
    switch (this.state.modalType) {
      case 'winning': return this.renderWinningModal();
      case 'lost': return this.renderLostModal();
      case 'newGame': return this.renderNewGameModal();
      default: return null;
    }
  }


  render() {
    const {
      remainingFields, activeFields, visitedFields, currentLevel, lives, levelsCompleted,
    } = this.props;

    return (
      <React.Fragment>
        <Table
          id="table"
          handleSelectFirstField={this.handleSelectFirstField}
          remainingFields={remainingFields}
          activeFields={activeFields}
          visitedFields={visitedFields}
        />
        <div id="stat">
          <p>You are playing level: {currentLevel}</p>
          <p>Time: {this.state.time}</p>
          <p>Left to click: {remainingFields.length}</p>
          <p>Lives: {lives}</p>
        </div>
        <Score
          levelsCompleted={levelsCompleted}
        />
        {this.renderModalComponent()}
      </React.Fragment>
    );
  }
}

App.propTypes = {
  minLevel: PropTypes.number,
  onSetLevel: PropTypes.func,
  onSetMaxLevel: PropTypes.func,
  onSetMinLevel: PropTypes.func,
  onSetRemaningFields: PropTypes.func,
  onSetActiveFields: PropTypes.func,
  onSetVisitedFields: PropTypes.func,
  onSetLives: PropTypes.func,
  onSetLevelsCompleted: PropTypes.func,
  onResetGame: PropTypes.func,
  currentLevel: PropTypes.number,
  maxLevel: PropTypes.number,
  remainingFields: PropTypes.array,
  activeFields: PropTypes.array,
  visitedFields: PropTypes.array,
  lives: PropTypes.number,
  levelsCompleted: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currentLevel: state.appReducer.currentLevel,
    maxLevel: state.appReducer.maxLevel,
    minLevel: state.appReducer.minLevel,
    remainingFields: state.appReducer.remainingFields,
    activeFields: state.appReducer.activeFields,
    visitedFields: state.appReducer.visitedFields,
    lives: state.appReducer.lives,
    levelsCompleted: state.appReducer.levelsCompleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetLevel: (level) => dispatch(setLevel(level)),
    onSetMaxLevel: (maxLevel) => dispatch(setMaxLevel(maxLevel)),
    onSetMinLevel: (minLevel) => dispatch(setMinLevel(minLevel)),
    onSetRemaningFields: (remainingFields) => dispatch(setRemainingFields(remainingFields)),
    onSetActiveFields: (activeFields) => dispatch(setActiveFields(activeFields)),
    onSetVisitedFields: (visitedFields) => dispatch(setVisitedFields(visitedFields)),
    onSetLives: (lives) => dispatch(setLives(lives)),
    onResetGame: () => dispatch(resetGame()),
    onSetLevelsCompleted: (levelCompleted) => dispatch(setLevelsCompleted(levelCompleted)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
