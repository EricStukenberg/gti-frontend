import React from 'react';
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div>
      <p> Welcome</p>
      <Link to='/login'>Log In</Link>
      <Link to='/signup'>Sign Up</Link>
    </div>
  );
};
export default Home;