import React, { Component } from 'react';
import { api } from "../../services/api";
import {Link} from 'react-router-dom'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      errors: '',
      fields: {
        username: '',
        email: '',
        password: '',
      }
     };
  }
handleChange = (e) => {
  const newFields = { ...this.state.fields, [e.target.name]: e.target.value };

  this.setState({
      fields: newFields
    })
  };
  handleSubmit = (e) => {
    e.preventDefault();
  
    api.auth.login(this.state.fields).then(res => {
      if(!res.error) {
        this.props.handleLogin(res);
        this.props.history.push('/menu');
      } else {
        this.setState({errors: res})
      }
     })

  }

handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }
render() {
    const {username, email, password} = this.state
return (
      <div>
        <h1>Log In</h1>
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
         <button placeholder="submit" type="submit">
            Log In
          </button>
          <div>
            or <Link to='/signup'>sign up</Link>
          </div>
          
         </form>
      </div>
    );
  }
}
export default Login;