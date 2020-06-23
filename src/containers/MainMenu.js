import React, { Component } from 'react';
import { api } from "../services/api";
import wheelImage from "./Images/Wheel.png";


import './MianMenu.scss';

const DB_URL = "http://localhost:3001/"



class MainMenu extends Component {


   
        state = {
            activeItem: '',
            activeItemPosition: 0,
            activeItemColor: '',
            initialState: true,
            menuItems: [
                { text: 'Start Game' },
                { text: 'Tutorial' },
                { text: 'Friends' },
                { text: 'Profile' },
            ],
            user: {},
            players: []
        }
        // this.handleClick = this.handleClick.bind(this)

    


    componentDidMount() {
        if (!localStorage.getItem("token")) {
          this.props.history.push("/login");
        } else {
            api.auth.getCurrentUser().then(user => {
              this.setState({
                user: user
                  });
                this.getPlayers()
                if (user.error) {
                    this.props.history.push("/login");
                }
            });
        }
    
    }   

    handleClick = (activeItem) => {

        if(this.state.initialState === false) {
            console.log(this.state.activeItemPosition)
            if(this.state.activeItemPosition === 0) {
                this.props.history.push("/game");
            }
        }
        return e => {
          e.preventDefault()
        
          this.setState({
            activeItem,
            activeItemPosition: document.getElementById(activeItem).offsetTop,
            initialState: false,

            activeItemColor: window.getComputedStyle(document.getElementById(activeItem)).getPropertyValue('background-color'),

          })
        }
      }



      displayCard() {
        if(this.state.activeItemPosition === 60) {
          return (
            <div> 
              <h2 className='h2-1'>Tutorial</h2>
              <p className='description'> To start click on Start game.</p>
              <img className='wheel-img' src={wheelImage} className="img-1" alt="Wheel" />
              <p className='description'> Then click on the wheel to randomly select a category then play the game.</p>

            </div>



            )


        } else if(this.state.activeItemPosition === 120) {
          console.log(this.state.players)
        const usernames = this.state.players.map((user, index) => <li className="player-container" key={index}> {user.username} {user.email}
                                                                  <button className="player-add-button">+</button></li> ) 
           return ( 
            <div> 
              <h2 className='h2-1'>Friends</h2>
              <h2 className='h2-1'>Players</h2>
              <ul>{usernames}</ul> 
            </div>
           )


        } else if(this.state.activeItemPosition === 180) {
          const user = this.state.user
          let winPer = Math.round(((user.score ) / user.winPer) * 10)
          if(Number.isNaN(winPer)) {
            winPer = 0
          }
          return (
            <div className="profile-card">
              <h3>{user.username} </h3>
              <h3>{user.email}</h3> 
              <h4>Score: {user.score}</h4>
              <h4> Percentage of Correct Answers: {winPer}% </h4>
              <button className="profile-button" onClick={(e) => this.deleteUser(e)}>Delete Profile</button> 
            </div>

          )

        } 
      }

      deleteUser = (e) => {
        console.log("CLICKED DELETE USER")
        fetch(DB_URL+'users/'+this.state.user.id, {
          method: "delete"
        }).then((res) => {
          return res.json()
        }).catch((err) => {
          console.error(err)
        });
        this.props.logout()
        this.props.history.push("/")

      }

      getPlayers() {
        fetch(DB_URL+'users')
        .then((res) => {
          return res.json();
        })
        .then((data) => {

           this.setState({
             players: data.users
           })
          });


      }
      
      
    render(){
        const menuItems = this.state.menuItems.map((item, index ) => <MenuItem key={index} item={ item } handleClick={ this.handleClick }/>)
        return (

            <div>
                <div className='menu-container'>
                    <span className='menu-item--active' style={{ top: this.state.activeItemPosition, backgroundColor: this.state.activeItemColor }}/>
                    { menuItems }
                </div>
                <div>
                    {this.displayCard()}
                </div>
          </div>
        )
    }

}

function MenuItem(props) {
    return (
      <div 
        className='menu-item'
        id={ props.item.text }
        onClick={props.handleClick(props.item.text) }
      >
        { props.item.text.toUpperCase() }
      </div>
    )
  }

export default MainMenu

