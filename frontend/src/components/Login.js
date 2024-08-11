import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';
import kornitImage from '../assets/kornitLogo.jpeg';
import correctImage from '../assets/correct input.svg';
import wrongImage from '../assets/wrong.svg';

const Login = () => {
  const [uniqueId, setUniqueId] = useState({
    value: "",
    img: wrongImage,
    color: "red"
  });
  const [password, setPassword] = useState({
    value: "",
    img: wrongImage,
    color: "red"
  });

  const navigate = useNavigate(); 

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: uniqueId.value, 
        password: password.value
      });
      if (response.data.token) {

        localStorage.setItem('token', response.data.token);
        console.log(response.data.token)

        navigate('/dashboard');
      } else {
        console.error('Token not found in response');
      }
    } catch (error) {

      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSignIn}>
        <div className='image-container'>
          <img className="kornitImage" src={kornitImage} alt="Kornit Logo" />
        </div>
        <div>
          <h2>Login to the system</h2>
          <p>Statistic system to see the preference for each client in one easy way to go.</p>
        </div>
        <div className="input-group">
          <label htmlFor="uniqueId">Unique id</label>
          <div className='input-container'>
            <input
              type="text"
              id="uniqueId"
              name="uniqueId"
              value={uniqueId.value}
              onChange={(e) => {
                const value = e.target.value;
                if (value.trim() === "") {
                  setUniqueId(previousState => ({
                    ...previousState,
                    color: "red",
                    img: wrongImage,
                    value: value
                  }));
                } else {
                  setUniqueId(previousState => ({
                    ...previousState,
                    color: "green",
                    img: correctImage,
                    value: value
                  }));
                }
              }}
              required
            />
            <img className="inputIcon" src={uniqueId.img} alt="Validation Icon"/>
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className='input-container'>
            <input
              type="password"
              id="password"
              name="password"
              value={password.value}
              onChange={(e) => {
                const value = e.target.value;
                if (value.trim() === "") {
                  setPassword(previousState => ({
                    ...previousState,
                    color: "red",
                    img: wrongImage,
                    value: value
                  }));
                } else {
                  setPassword(previousState => ({
                    ...previousState,
                    color: "green",
                    img: correctImage,
                    value: value
                  }));
                }
              }}
              required
            />
            <img className="inputIcon" src={password.img} alt="Validation Icon"/>
          </div>
        </div>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
