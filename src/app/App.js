import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from './components/table/index';
import { createGame } from '../utils/gameConfig';
import { gameOptions, startLevel } from '../utils/constants';
import Modal from 'react-modal';

import {
  selectLevel,
  newGame,
  activateFields,
  playGame,
  setMaxLevel,
  setLife
} from './actions/appActions'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      modalType: '',
      time: 0
    };
  }

  componentDidMount() {
    this.handleNoModal()
  }

  openModal = (type) => {
    this.setState({ modalIsOpen: true, modalType: type });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false, modalType: '' });
  }

  createLevelOptions = () => {
    let options = [];
    for (let i = startLevel; i <= this.props.maxLevel; i++) {
      let option = <option key={i} value={i}>
        level {i}
      </option>
      options.push(option);
    }
    return options;
  }

  startGame = (field) => {
    var game = createGame(field, this.props.levelSelected, gameOptions, [field]);
    this.props.onCreateGame(game);
    var visitedFields = this.props.visitedFields
    visitedFields.push(field);
    this.props.onPlayingGame(visitedFields);

    let activeFields = game.filter(element => {
      let a = Math.abs(parseInt(element[0]) - parseInt(field[0]));
      let b = Math.abs(parseInt(element[1]) - parseInt(field[1]));
      let br = a.toString() + b.toString()
      if (br === '03' || br === '30' || br === '22') {
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
    var level = localStorage.getItem('level');
    this.props.onNextGame(parseInt(level) + 1);
    var life = localStorage.getItem('life');
    this.props.onSetLife(parseInt(life) + 1)
  }

  handleSameGame = () => {
    this.closeModal()
    this.props.onPlayingGame([]);
    this.props.onCreateGame([]);
    let maxLevel = localStorage.getItem('maxLevel');
    this.props.onSetMaxLevel(parseInt(maxLevel));
    let level = localStorage.getItem('level');
    this.props.onNextGame(parseInt(level));
    let life = localStorage.getItem('life');
    this.props.onSetLife(parseInt(life) + 1)
  }

  handleNoModal = () => {
    let maxLevel = localStorage.getItem('maxLevel');
    this.props.onSetMaxLevel(maxLevel ? maxLevel : 1);
    this.openModal('newGame');
  }

  handlePlayNewGame = () => {
    this.props.onPlayingGame([]);
    this.props.onCreateGame([]);
    let maxLevel = localStorage.getItem('maxLevel');
    this.props.onSetMaxLevel(maxLevel ? maxLevel : 1);
    let life = localStorage.getItem('life');
    this.props.onSetLife(life ? life : 0);
    this.closeModal();    
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

    if ((this.props.game.length === 0) && (this.props.visitedFields.length === 0)) {
      this.startGame(field);

      this.timer = setInterval(() => {
        this.tick();
      }, 1000);

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
          if (br === '03' || br === '30' || br === '22') {
            return true;
          } else {
            return false;
          }
        });

        if (activeFields.length === 0 && game.length > 0) {
          clearInterval(this.timer);
          this.resetTimer()
          let lostLifes = this.props.game.length;
          if(this.props.life - this.props.game.length > 0) {
            localStorage.setItem('life', this.props.life - this.props.game.length)
          } else {
            localStorage.setItem('life', 0);
            localStorage.setItem('maxLevel', 1);
            localStorage.setItem('level', 1)
          }
          this.openModal('losing');

        } else if (activeFields.length === 0 && game.length === 0) {
          clearInterval(this.timer);
          this.resetTimer()
          localStorage.setItem('life', this.props.life)
          localStorage.setItem('level', this.props.levelSelected);
          let maxLevel = localStorage.getItem('maxLevel');
          if (maxLevel < this.props.levelSelected) {
            localStorage.setItem('maxLevel', this.props.levelSelected)
          }
          this.openModal('winning');
        }
        this.props.onActivateFields(activeFields);
      }
    }
  }

  renderWinningModal = () => {
    return (
      <Modal
        className="modal"
        isOpen={this.state.modalIsOpen}
        contentLabel="Example Modal"
      >
        <h2 ref={subtitle => this.subtitle = subtitle}>You have complited level: {this.props.levelSelected}</h2>
        <div>Do you want to play next level?</div>
        <button className="modalButton" onClick={this.handleNextGame}>yes</button>
        <button className="modalButton" onClick={this.handleNoModal}>no</button>
      </Modal>
    )
  }

  renderLosingModal = () => {
    return (
      <Modal 
      className="modal"
        isOpen={this.state.modalIsOpen}
        contentLabel="Example Modal"
      >
        <h2 ref={subtitle => this.subtitle = subtitle}>End game {this.props.level}</h2>
        <div>You have lost this game. Do you want to play again?</div>
        <button className="modalButton" onClick={this.handleSameGame}>yes</button>
        <button className="modalButton" onClick={this.handleNoModal}>no</button>
      </Modal>
    )
  }

  renderNewGameModal = () => {
    return (
      <Modal
        className="modal"
        isOpen={this.state.modalIsOpen}
        contentLabel="Example Modal"
      >
        <h2 ref={subtitle => this.subtitle = subtitle}>Play new game</h2>
        <div>Select level:</div>
        <select name="level" onChange={this.handleLevelSelect} >
          {this.createLevelOptions()}
        </select>
        <button className="modalButton" onClick={this.handlePlayNewGame}>start</button>
        <button className="modalButton" onClick={this.handlePlayNewGame}>no</button>
      </Modal>
    )
  }

  renderModalComponent = () => {
    switch (this.state.modalType) {
        case "winning": return this.renderWinningModal();
        case "losing": return this.renderLosingModal();
        case "newGame": return this.renderNewGameModal();
    }
}

  render() {
    return (
      <React.Fragment>
        <Table id="table"
          handleSelectFirstField={this.handleSelectFirstField}
          game={this.props.game}
          activeFields={this.props.activeFields}
          visitedFields={this.props.visitedFields}
        />
        <div id="stat">
        <div>You are playing level {this.props.levelSelected}</div>
        <div>Time: {this.state.time}</div>
        <div>Clicked: {this.props.visitedFields.length}</div>
        <div>Life: {this.props.life}</div>
        </div>
        {this.renderModalComponent()}      
      </React.Fragment>
    );
  }
}

App.propTypes = {
  onLevelSelected: PropTypes.func,
  onCreateGame: PropTypes.func,
  onActivateFields: PropTypes.func,
  onPlayingGame: PropTypes.func,
  onNextGame: PropTypes.func,
  onSetMaxLevel: PropTypes.func,
  onSetLife: PropTypes.func
};

const mapStateToProps = state => {
  return {
    levelSelected: state.appReducer.levelSelected,
    maxLevel: state.appReducer.maxLevel,
    game: state.appReducer.game,
    activeFields: state.appReducer.activeFields,
    visitedFields: state.appReducer.visitedFields,
    life: state.appReducer.life
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLevelSelected: (level) => dispatch(selectLevel(level)),
    onCreateGame: (game) => dispatch(newGame(game)),
    onActivateFields: (activeFields) => dispatch(activateFields(activeFields)),
    onPlayingGame: (visitedFields) => dispatch(playGame(visitedFields)),
    onNextGame: (level) => dispatch(selectLevel(level)),
    onSetMaxLevel: (maxLevel) => dispatch(setMaxLevel(maxLevel)),
    onSetLife: (life) => dispatch(setLife(life))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
