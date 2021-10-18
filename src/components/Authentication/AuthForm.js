import React, {useState} from 'react';
import classes from './AuthForm.module.css';

import {Button, Input} from "antd";
import CustomSpiner from "../CustomSpiner/CustomSpiner";
import {useDispatch, useSelector} from "react-redux";
import validator from "validator";
import * as authActions from "../../store/actions/auth";

const AuthForm = () => {
    const auth = useSelector(state => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authMode, setAuthMode] = useState(true); //true - sign up, false - sign in

    const dispatch = useDispatch();

    const changeAuthModeHandler = () => {
        setAuthMode(prevState => !prevState);
    }

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const signUpHandler = () => {
        if(!validator.isEmail(email)) {
            alert('Enter valid email');
            return;
        }
        if(!validator.isLength(password, {min: 6, max: 100})) {
            alert('Enter valid password (min 6 cherekters)');
            return;
        };
        dispatch(authActions.signUp(email, password));
    }

    const signInHandler = async () => {
        if(!validator.isEmail(email)) {
            alert('Enter valid email');
            return;
        }
        if(!validator.isLength(password, {min: 6, max: 100})) {
            alert('Enter valid password (min 6 cherekters)');
            return;
        };
        dispatch(authActions.login(email, password));
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if(authMode) {
            signUpHandler();
        } else {
            signInHandler();
        }
    }

  return(
      <form onSubmit={formSubmitHandler} style={{width: 300}}>
          <label htmlFor='email'>
              Email:
              <Input id='email' type="email" value={email} onChange={emailChangeHandler}/>
          </label>
          <label htmlFor='password'>
              Password
              <Input id='password' type='password' value={password} onChange={passwordChangeHandler}/>
          </label>
          {authMode ?
              <div className={classes.buttonContainer}>
                  {auth.authLoading ? <CustomSpiner/> : <Input type='submit' value='Sign up'/>}
                  <Button size='small' type='text' onClick={changeAuthModeHandler}>Sign in</Button>
              </div>
              :
              <div className={classes.buttonContainer}>
                  {auth.authLoading ? <CustomSpiner/> : <Input type='submit' value='Sign in'/>}
                  <Button size='small' type='text' onClick={changeAuthModeHandler}>Sign up</Button>
              </div>
          }
      </form>
  );
}

export default AuthForm;
