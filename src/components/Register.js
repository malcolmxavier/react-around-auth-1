import e from 'express';
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from './Header';
import * as auth from '../auth';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleEmailChange(e) {
    setEmail(e.target.value)
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }
  function handleSubmit() {
    e.preventDefault();
    auth.register(password, email)
      .then((res) => {
        if (res) {
          props.history.push('/login');
        } else {
          console.log('Something went wrong!');
        }
      })
  };
  return (
    <>
      <Header link="/signin" linkText="Sign In" />
      <section className="form" >
        <form onSubmit={handleSubmit} className="form__container" name={props.name}>
          <h2 className="form__title">Sign up</h2>
          <input required id="signup-email"
            className="form__input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleEmailChange}
          />
          <input required id="signup-password"
            className="form__input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          <button className="form__button" type="submit" value="submit">Log in</button>
          <Link to="/signin" className="form__link">Already a member? Log in here!</Link>
        </form>
      </section>
    </>
  )
}
export default withRouter(Register);
