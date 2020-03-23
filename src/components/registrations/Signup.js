import React, { Component } from 'react';
import { api } from "../../services/api";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      errors: '',
      fields: {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
     };
  }
handleChange = (e) => {
  console.log(e.target.value)
  const newFields = { ...this.state.fields, [e.target.name]: e.target.value };

  this.setState({
      fields: newFields
  })
  console.log(this.state)
  };
  handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, password, password_confirmation} = this.state.fields
    let user = {
      username: username,
      email: email,
      winPer: 0,
      password: password,
      password_confirmation: password_confirmation,
      score: 0
    }

    fetch('http://localhost:3001/users', {
      method: 'post',
      headers: {'Content-Type':'application/json',
      Accept: 'application/json'
      },
      body: JSON.stringify({user: user}) 
    
    }).then((res) => res.json()).then((data)=> {
      console.log(data)
      api.auth.login(this.state.fields).then(res => {
        if(!res.error) {
          this.props.handleLogin(res);
          this.props.history.push('/menu');
        } else {
          this.setState({errors: res})
        }
       })
    });
  }

handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li> key={error}>{error}</li>
        })}
        </ul> 
      </div>
    )
  }
render() {
    const {username, email, password, password_confirmation} = this.state
return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input 
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <input
            placeholder="password confirmation"
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={this.handleChange}
          />
        
          <button placeholder="submit" type="submit">
            Sign Up
          </button>
      
        </form>

      </div>
    );
  }
}
export default Signup;