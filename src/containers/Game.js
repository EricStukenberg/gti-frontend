import React, { Component } from 'react';
import { api } from "../services/api";
import Wheel from '../components/Wheel.js';
import Round from '../components/Round';
import FlashMassage from 'react-flash-message';
import './MianMenu.scss';

const API_BASE_URL = 'https://opentdb.com/'
const DB_URL = "http://localhost:3001/"
class Game extends Component {
    state = {
        user: {},
        categories: [],
        indexes: [],
        questions: [], 
        selected: false,
        correct: false,
        incorrect: false,
        correctAnswer: "",
        score: 0,
    }
    componentDidMount() {
        console.log(this.props)
        if (!localStorage.getItem("token")) {
          this.props.history.push("/login");
        } else {
            api.auth.getCurrentUser().then(user => {
                if (user.error) {
                    this.props.history.push("/login");
                } 
                console.log("USER", user)
                this.setState({
                    user: user,
                    score: user.score,
                    questionCount: user.winPer

                })

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
        const index = this.state.indexes[selectedItem]

        fetch(API_BASE_URL+'api.php?amount=3&category=' + index + '&token=' + this.props.apiToken)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
            setTimeout(() => { 
              this.setState({
                questions: data.results,
                selected: true
              });
            }, 4500);

  
        })

    }

    handleCorrectAnswer = () => {
        this.setState({
            score: this.state.score+10,
            correct: true
        })
        setTimeout(() => {
            this.setState({
                correct: false
            })
        }, 2000)

    }

    handleIncorrectAnswer = (correctAnswer) => {
        this.setState({
            incorrect: true
        })
        setTimeout(() => {
            this.setState({
                incorrect: false
            })
        }, 2000)

    }
    handleOutOfQuestion = (count) => {
        console.log("COUNT", count)
        let newUser = this.state.user
        newUser.score = this.state.score
        newUser.winPer = parseFloat(count + newUser.winPer) + .0

        this.setState({
            selected: false,
            user: newUser

        })
        fetch(DB_URL + 'users/' + this.state.user.id, {
            method: 'PUT',
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json",
                Accepts: "application/json",
            }
        }).then(res => {
            console.log(res.json())
            return res.json();
        }).catch(err => {
            console.error(err);
        })

    }

    render (){
        return (
            <div>
                <div className="score-card">
                    <h2>{this.props.user.username}</h2>
                    <h3>Score: {this.state.score}</h3>
                </div>
                {this.state.selected ? <Round handleOutOfQuestion={this.handleOutOfQuestion} 
                                handleCorrectAnswer={this.handleCorrectAnswer}
                                handleIncorrectAnswer={this.handleIncorrectAnswer}
                                score={this.state.score} 
                                user={this.props.user} questions={this.state.questions} /> : 
                                <Wheel items={this.state.categories} onSelectItem={this.handleSelect}/>}
                {this.state.correct? <FlashMassage duration={2000} persistOnHover={true}>
                    <h4 className='flash-h4'>Correct</h4>
                </FlashMassage> :null}
                {this.state.incorrect? <FlashMassage duration={2000} persistOnHover={true}>
                    <h4 className='flash-h4-incorrect'>Incorrect</h4>
                </FlashMassage> :  null}

            </div>
 
        );
    }
}
export default Game;