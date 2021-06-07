import React, { createContext, Component } from "react";
import { createBrowserHistory } from "history";
import api from "./config";

export const GameContext = createContext();

const newHistory = createBrowserHistory();

class GameProvider extends Component {
  state = {
    loading: false,
    error: "",
    play: "",
    highestScore: 0,
    userName: "",
    attempts: 0,
    startBtn: true,
  };

  canPlay = () => {
    if (this.state.attempts === 10) {
      this.setState({ play: "You have reached your daily play limit!" });
    } else {
      this.setState({ play: "" });
    }
  };

  startGame = () => {
    window.startGame();
    this.setState({
      startBtn: false,
    });
  };

  register = (data) => {
    this.setState({ loading: true, error: "" });
    return api
      .post("/register", data)
      .then((res) => {
        const { data, status } = res;
        this.setState({ loading: false });
        if (status === 200) {
          newHistory.push("/");
          this.setState({ userName: data.userName });
          localStorage.setItem("APDsession", data.accessToken);
          localStorage.setItem("id", data.id);
        }
      })
      .catch((error) => {
        console.log([error]);
        newHistory.push("/register");
        if (error.message === "Request failed with status code 401") {
          this.setState({ error: error.response.data });
        } else {
          this.setState({ error: error.message });
        }
      });
  };

  login = (data) => {
    this.setState({ loading: true, error: "" });
    return api
      .post("/login", data)
      .then((res) => {
        const { data, status } = res;
        this.setState({ loading: false });
        if (status === 200) {
          newHistory.push("/");
          this.setState({ userName: data.userName });
          localStorage.setItem("APDsession", data.accessToken);
          localStorage.setItem("id", data.id);
        }
      })
      .catch((error) => {
        this.setState({ loading: false });

        if (error.message === "Request failed with status code 401") {
          this.setState({ error: error.response.data });
        } else {
          this.setState({ error: error.message });
        }
      });
  };

  saveGame = (data) => {
    this.setState({ loading: true, error: "" });
    const id = localStorage.getItem("id");
    return api
      .post(`/game/${id}`, data)
      .then((res) => {
        const { data, status } = res;
        this.setState({ loading: false });
        if (status === 200) {
          this.setState(
            {
              userName: data.userName,
              attempts: data.games.gameCounter,
              highestScore: data.games.highestScore,
            },
            () => {
              this.canPlay();
            }
          );
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        if (error.message === "Request failed with status code 401") {
          this.setState({ error: error.response.data });
        } else {
          this.setState({ error: error.message });
        }
      });
  };

  getStats = () => {
    let id = localStorage.getItem("id");
    if(id == null)
     return newHistory.push("/login");
    const model = {};
    model.gameDate = new Date().toISOString().slice(0, 10);
    return api
      .post(`/user/${id}`, model)
      .then((res) => {
        const { data, status } = res;
        this.setState({ loading: false });
        console.log(data);
        if (status === 200) {
          this.setState(
            {
              userName: data.userName,
              attempts: data.games.gameCounter,
              highestScore: data.games.highestScore,
            },
            () => {
              this.canPlay();
            }
          );
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        if (error.message === "Request failed with status code 401") {
          this.setState({ error: error.response.data });
        } else {
          this.setState({ error: error.message });
        }
      });
  };

  logout = () => {
    localStorage.removeItem("APDsession");
    localStorage.removeItem("id");
    this.setState({
      loading: false,
      error: "",
      play: "",
      highestScore: 0,
      userName: "",
      attempts: 0,
      startBtn: true,
    });
  };

  render() {
    return (
      <GameContext.Provider
        value={{
          ...this.state,
          register: this.register,
          login: this.login,
          logout: this.logout,
          saveGame: this.saveGame,
          startGame: this.startGame,
          getStats: this.getStats,
          history: newHistory,
          userName:this.state.userName
        }}
      >
        {this.props.children}
      </GameContext.Provider>
    );
  }
}

export default GameProvider;
