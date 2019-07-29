import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const base_url = 'http://localhost:4000'


class Restricted extends Component {
    state = {
      users: []
    }

    componentDidMount() {
        this.handleGetUsers()
    }

    handleGetUsers = async () => {
        const token = localStorage.getItem('token')
        console.log('token: ', token)
        const axiosConfig = {
                      headers: {
                          "Content-Type": "application/json;charset=UTF-8",
                          "token": token
                      }};
        await axios.get(base_url + '/users', axiosConfig)
            .then(res => {
              if (res.data.status){
                this.setState({ users: res.data.data })
              } else {
                this.setState({ users: [{name:'Please Login first.'}] })
              }
        });
    }

    render() {
        console.log('renderRestrict: ', this.state)
        return (
            <div className="App">
                <div className="App-header">
                    <form>
                        <h1><strong>Restricted</strong></h1>
                    </form>
                    <p>
                        <strong>Users list:</strong>
                    </p>
                    {this.state.users && this.state.users.map(user => {return(<p>{user.name}</p>)} )}

                </div>
            </div>
        );
    }
}

export default Restricted;
