import React, { Component } from "react";
import { Route, Switch, Router } from "react-router-dom";
import "./App.scss";
import Header from "../../components/Header/Header";
import GameProvider, { GameContext } from "../../providers/GameProvider";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Home from "../Home/Home";

import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";

class App extends Component {
  render() {
    return (
      <GameProvider>
        <GameContext.Consumer>
          {(context) => (
            <Router {...context}>
              <Header logout={context.logout} />
              <Switch>
                <Route
                  exact
                  path="/login"
                  render={() => <Login {...context} />}
                />
                <Route
                  exact
                  path="/register"
                  render={() => <Register {...context} />}
                />
                <Route
                  exact
                  path="/game"
                  render={() => <Home {...context} />}
                />
                <PrivateRoute exact path="/" {...context} component={Home} />
              </Switch>
            </Router>
          )}
        </GameContext.Consumer>
      </GameProvider>
    );
  }
}

export default App;
