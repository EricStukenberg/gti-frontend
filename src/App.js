import React, { Component } from 'react';
import axios from 'axios'
import Home from './components/Home'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MainMenu from './containers/MainMenu';


import './App.css';
const DB_URL = "http://localhost:3001/"


class App extends Component{
  state = {
    isLoggedIn: false,
    user: {}
  }

  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', 
   {withCredentials: true})
    .then(response => {
      console.log(response.data)
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
    console.log(this.state)
  }
handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }

  render() {
    if(this.state.isLoggedIn) {
      return (
        <div> 
          <MainMenu user={this.state.user} /> 
        </div>
      )
    } else {
      return (
        <div>
          <Router>
            <Switch>
              <Route exact path='/' >
                <Home loggedInStatus={this.state.isLoggedIn}/>
              </Route>
              <Route exact path='/login' >
                <Login handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              </Route>
              <Route exact path='/signup' >
                <Signup handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              </Route>
            </Switch>
          </Router>
        </div>
      );
    }
  }
}


export default App;



// render() {
//   return (
//     <div className="App">
//       <Router>
//         <Switch>
//           <Route path='/'>
//             {this.state.isLoggedIn ? <MainMenu /> : <Home />}

//           </Route>
//           <Route path='/login'>

//           </Route>
//           <Route path='/signup'>

//           </Route>
//         </Switch>
//       </Router>

//     </div>
//   );
//   }
