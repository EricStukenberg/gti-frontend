import React, { Component } from 'react';
import { api } from "../services/api";
import Wheel from '../components/Wheel.js';
import {Link} from 'react-router-dom'
class Game extends Component {
    state = {
        categories: ["General Knowledge", "Entertainment: Books", "Entertainment: Film",
                     "Entertainment: Music", 
                     "Entertainment: Television", "Entertainment: Video Games","Science & Nature", 
                     "Science: Computers"
                    ]
    }
    componentDidMount() {
        if (!localStorage.getItem("token")) {
          this.props.history.push("/login");
        } else {
            api.auth.getCurrentUser().then(user => {
                // console.log(user);
                if (user.error) {
                    this.props.history.push("/login");
                }
            });
        }
    
    }   
    render (){
        console.log(this.state.categories)
        return (
            <div>
                <Wheel items={this.state.categories}/>
            </div>
        );
    }
}
export default Game;