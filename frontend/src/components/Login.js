import React, { useState } from 'react';
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

  return (
    <div className="login-container">
      <form className="login-form">
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
        <p className='wrong-note'>notes...</p>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
