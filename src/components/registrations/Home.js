import React from 'react';
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div className='welcome'>
      <p> Welcome to Trivia Quizzer</p>
      <Link className='links' to='/login'>Log In</Link>
      <Link className='links' to='/signup'>Sign Up</Link>
    </div>
  );
};
export default Home;