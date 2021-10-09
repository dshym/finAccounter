import React, {useState} from 'react';
import {Button, Input} from "antd";
import {useDispatch} from "react-redux";
import validator from "validator";
import * as authActions from "../../store/actions/auth";

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
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

    const userNameChangeHandler = (event) => {
        setUserName(event.target.value);
    }

    const signUpHandler = () => {
        if(validator.isEmpty(userName)) {
            alert('Enter user name');
            return;
        }
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

    const signInHandler = () => {
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
          {authMode && <label htmlFor='userName'>
              User name:
              <Input id='userName' type='text' value={userName} onChange={userNameChangeHandler}/>
          </label>}
          <label htmlFor='email'>
              Email:
              <Input id='email' type="email" value={email} onChange={emailChangeHandler}/>
          </label>
          <label htmlFor='password'>
              Password
              <Input id='password' type='password' value={password} onChange={passwordChangeHandler}/>
          </label>
          {authMode ?
              <React.Fragment>
                  <Input type='submit' value='Sign up'/>
                  <Button size='small' type='text' onClick={changeAuthModeHandler}>Sign in</Button>
              </React.Fragment>
              :
              <React.Fragment>
                  <Input type='submit' value='Sign in'/>
                  <Button size='small' type='text' onClick={changeAuthModeHandler}>Sign up</Button>
              </React.Fragment>
          }
      </form>
  );
}

export default AuthForm;
