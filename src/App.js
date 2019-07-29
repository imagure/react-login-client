import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

const base_url = 'http://localhost:4000';

class App extends Component {
  state = {
    name: '',
    password: '',
    status:'',
    users: [],
    token: '',
    valid_user: false
  }

  handleLogin = async () => {
    console.log("handleLogin: ", this.state)
    const payload = {name: this.state.name,
                     password: this.state.password};
    console.log('base_url: ', base_url)
    try{
      await axios.post(base_url + '/login', payload)
      .then(res => {
        console.log('resLogin: ', res)
        this.setState({ token: res.data.token, status: res.data.status})
        localStorage.setItem('token', res.data.token)
      })
    } catch(err) {
      console.log(err)
    }
}

  handleClick = async () => {
    console.log("handleClick: ", this.state)
    const userName = {name: this.state.name}
    const axiosConfig = {
                      headers: {
                          "Content-Type": "application/json;charset=UTF-8",
                          "token": this.state.token
                      }};
    console.log('base_url: ', base_url)
    try {
      await axios.post(base_url + '/verify_user', userName, axiosConfig)
        .then(res => {
          console.log('resClick: ', res)
          this.setState({ valid_user: res.data.status, status: res.data.message })
        })
    } catch(err) {
      console.log(err)
    }
  }

render() {
  console.log('render: ', this.state)
  console.log('renderProps: ', this.props)
  if (this.state.valid_user === true) {
      return <Redirect to='/restricted' />
  }
    return (
      <div className="App">
          <div className="App-header">
        <form>
            <h1><strong>Login</strong></h1>
            <h3>Username:</h3>
          <input
              type="text"
              value={this.state.text}
              onChange={e => this.setState({ name: e.target.value })}
          />
            <h3>Password:</h3>
            <input
                type="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
             />
        </form>
            <button onClick={this.handleLogin}> Login </button>        
        <p>
          <strong> Status: </strong>
        </p>
        {this.state.status}
        <Link to="/register"> Sign up here </Link>
        <button className="App-link" onClick={this.handleClick}> Verify </button>
       </div>
      </div>
    );
  }
}

export default App;
