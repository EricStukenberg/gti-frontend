import React, { Component } from 'react';
import { api } from "./services/api";
import Home from './components/registrations/Home'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MainMenu from './containers/MainMenu';
import NavBar from './components/NavBar';
import Game from './containers/Game';
import './components/registrations/registration.css';



import './App.css';


class App extends Component{

  state = {
    isLoggedIn: false,
    user: {},
    apiToken: ""

  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if(token) {
      api.auth.getCurrentUser().then(user => {
      this.setState({
        isLoggedIn: true,
        user: user
          });
      this.getAPIToken()

    });

    }
  }


  handleLogin = (data) => {
    console.log(data)
    this.setState({
      isLoggedIn: true,
      user: data
    })
    localStorage.setItem("token", data.jwt);
  }

  getAPIToken() {
    fetch('https://opentdb.com/api_token.php?command=request')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      this.setState({
        apiToken: data.token
      })
      console.log(this.state)


    })

  }
  handleLogout = () => {
    console.log("clicked logout")
    localStorage.removeItem("token");
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  render() {
    if(this.state.isLoggedIn) {
      return (
        <div> 
          <Router >
             <NavBar logout={this.handleLogout}/>
            <Switch>
              <Route exact path='/menu' render={props =>
                <MainMenu {...props} 
                  user={this.state.user} logout={this.handleLogout}/>}/>

              <Route exact path='/game' render={props =>
                <Game {...props} 
                  user={this.state.user} apiToken={this.state.apiToken}/>}/>

            </Switch>
          </Router>
        </div>
      )
    } else {
      return (
        <div>
          <Router>
            <Switch>
              <Route exact path='/' >
                <Home loggedInStatus={this.state.isLoggedIn} />
              </Route>
              <Route exact path='/login' 
              render={props => <Login {...props} 
                                 handleLogin={this.handleLogin} 
                                 loggedInStatus={this.state.isLoggedIn}/>}/>
              <Route exact path='/signup'  
              render={props => <Signup {...props}
                              handleLogin={this.handleLogin} 
                              loggedInStatus={this.state.isLoggedIn}/>}/>
            </Switch>
          </Router>
        </div>
      );
    }
  }
}


export default App;