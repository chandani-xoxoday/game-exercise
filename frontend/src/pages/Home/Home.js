import React, { Component } from "react";
import "./Home.scss";
import { setTokenHeader } from "../../providers/config";

class Home extends Component {
  componentDidMount() {
    setTokenHeader();
    this.props.getStats();
  }

  startGame = () => {
    this.props.startGame();
  };

  setScore = () => {
    const score = window.checkScore();
    const model = {};
    model.score = score;
    model.gameDate = new Date().toISOString().slice(0, 10);
    if (score) {
      this.props.saveGame(model);
    }
  };

  render() {
    const { play, startBtn, userName, attempts, highestScore, logout } = this.props;

    return (
      <div className="game-container">
        <div className="header">
        <div className="header-title">
             <h5>Let's Play {userName}</h5>
        </div>
        </div>
        <div className="stats">
            <div className="score">{highestScore}</div>
            <div className="attempts">{attempts}/10</div>
          </div>
        <small>{play}</small>
        <p>Click the buttons to move the red square</p>
        {startBtn ? (
          <button disabled={play} onClick={this.startGame}>
            Start Game
          </button>
        ) : null}
        <div id="myfilter" className="my-filter"></div>
        <div id="myrestartbutton" className="my-restartbutton">
          <button
            disabled={play}
            onClick={() => {
              window.restartGame();
              this.setScore();
            }}
          >
            Restart
          </button>
        </div>
        <div id="canvascontainer"></div>
        <div className="btn-ctrl">
          <button
            disabled={play}
            onTouchStart={window.moveup}
            onMouseDown={window.moveup}
            onMouseUp={window.clearmove}
          >
            UP
          </button>
          <br />
          <br />
          <button
            disabled={play}
            onTouchStart={window.moveleft}
            onMouseDown={window.moveleft}
            onMouseUp={window.clearmove}
          >
            LEFT
          </button>
          <button
            disabled={play}
            onTouchStart={window.moveright}
            onMouseDown={window.moveright}
            onMouseUp={window.clearmove}
          >
            RIGHT
          </button>
          <br />
          <br />
          <button
            disabled={play}
            onTouchStart={window.movedown}
            onMouseDown={window.movedown}
            onMouseUp={window.clearmove}
          >
            DOWN
          </button>
        </div>{" "}

          <div className="logout" onClick={() => this.props.logout(this.props)}>
            <button>Logout</button>
          </div>
      </div>
    );
  }
}

export default Home;
