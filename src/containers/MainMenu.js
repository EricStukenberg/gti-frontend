import React, { Component } from 'react';
import './MianMenu.scss';


class MainMenu extends Component {
    state = {
        user: this.props.user
      }
      handleClick = (e) =>  {
        //   e.preventDefualt();
     }
      
    render(){
        console.log(this.props.user)

        return(
            <div>
                <span className='menu-label'>Main Menu</span>
                <div className='menu-container'>
                    <span className='menu-item--active' onClick={this.handleClick(this.state.activeItem)}>Start Game</span>




                </div>
            </div>
        )
    }

}

export default MainMenu
