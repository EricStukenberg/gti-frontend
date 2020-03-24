import React, { Component } from 'react';
import { api } from "../services/api";
import Wheel from '../components/Wheel.js';
import {Link} from 'react-router-dom'
const API_BASE_URL = 'https://opentdb.com/'
class Game extends Component {
    state = {
        categories: [],
        indexes: [],
        questions: []
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
            this.getApiCategories()
        }

    
    }

    getApiCategories() {
        fetch(API_BASE_URL+'api_category.php')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
            let cats = data.trivia_categories
            const newArr = [];
            for(let i = 0; i < 10; i++) {
                let rand = cats[Math.floor(Math.random() * 22)];
                if(!newArr.includes(rand)) {
                    newArr.push(rand);
                } else {
                    i--;
                }
            }
            let indexes = []
            cats = []
            for(let i = 0; i < 10; i++) {

                cats.push(newArr[i].name);
                indexes.push(newArr[i].id);
            }
            this.setState({
                categories: cats,
                indexes: indexes
            })
        })
    
    }

    handleSelect = (selectedItem) => {
        console.log("selectedItem", selectedItem)
        console.log("API Token", this.props.apiToken)
        const index = this.state.indexes[selectedItem]
        console.log("selectedItem", index)

        fetch(API_BASE_URL+'api.php?amount=3&category=' + index + '&token=' + this.props.apiToken)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
            console.log(data.results)
        })

    }

    render (){
        console.log(this.state.categories)
        return (
            <div>
                <Wheel items={this.state.categories} onSelectItem={this.handleSelect}/>
            </div>
        );
    }
}
export default Game;