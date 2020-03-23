import React, { Component } from 'react';
import { api } from "../services/api";

import './MianMenu.scss';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
// import {BrowserRouter as Router, Switch, Route, useHistory, Redirect} from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


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
            user: this.props.user
        }
        // this.handleClick = this.handleClick.bind(this)

    


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

      
      
    render(){
        const menuItems = this.state.menuItems.map(item => <MenuItem item={ item } handleClick={ this.handleClick }/>)
        return (

            <div>
                <span className='menu-label'>Main Menu</span>
                <div className='menu-container'>
                    <span className='menu-item--active' style={{ top: this.state.activeItemPosition, backgroundColor: this.state.activeItemColor }}/>
                    { menuItems }
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
/* 
                    <LinearProgress />
                <LinearProgress color="secondary" /> */
