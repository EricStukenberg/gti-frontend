import React, { Component } from 'react';
import { api } from "../services/api";

class Round extends Component {
    state = {
        currQuestion: {}, 
        allAnswerOptions: [],
        selectedOption: "",
        index: 0, 
        questionCount: 1
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
            });
            let allOptions = []
            allOptions.push(this.props.questions[0].incorrect_answers)
    
            
            allOptions.push(this.props.questions[0].correct_answer);
            allOptions = allOptions.flat()
            allOptions.sort(() => Math.random() - 0.5);
            this.setState({
                currQuestion: this.props.questions[0],
                allAnswerOptions: allOptions
            })
        }

    
    }

    handleOptionChange = changeEvent => {
        this.setState({
          selectedOption: changeEvent.target.value
        });
      };

      handleFormSubmit = e => {
        e.preventDefault();
        
        console.log("You have submitted:", this.state.selectedOption);
        this.setState({
            questionCount: this.state.questionCount + 1
        });
            if(this.state.selectedOption === this.state.currQuestion.correct_answer) {
                console.log("YOU GUESSED CORRECT")
                this.props.handleCorrectAnswer();
                
            }

            if(this.props.questions[this.state.index + 1] != null) {
                let allOptions = []
                allOptions.push(this.props.questions[this.state.index + 1].incorrect_answers)

                
                allOptions.push(this.props.questions[this.state.index + 1].correct_answer);
                allOptions = allOptions.flat()
                allOptions.sort(() => Math.random() - 0.5);
                this.setState({
                    currQuestion: this.props.questions[this.state.index + 1],
                    allAnswerOptions: allOptions,
                    index: this.state.index+1 
                })
            } else {
                this.props.handleOutOfQuestion(this.state.questionCount)
            }
        
      };


    render (){
   
        const answers = this.state.allAnswerOptions.map((item, index ) => <Answers key={index} 
                                                        value={ item } selectedOption={this.state.selectedOption} 
                                                        handleOptionChange={this.handleOptionChange}/>)
        return ( 
            <div>
                <p>{this.state.currQuestion.question}</p>
                <form onSubmit={this.handleFormSubmit}> 
                    {answers}
                    <div className="form-group">
                    <button className="btn btn-primary mt-2" type="submit">
                        Submit
                    </button>
                    </div>
                </form>
            </div>

        );
    }


}

function Answers(props) {
    return (
        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              checked={props.selectedOption === props.value}
              onChange={props.handleOptionChange}
              value={props.value}
              className="form-check-input"
            />
            {props.value}
          </label>
        </div>
    )
  }

export default Round;