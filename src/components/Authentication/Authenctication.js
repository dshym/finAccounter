import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth';

const Authenctication = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const userDataStore = useSelector(state => state.auth);
    const dispatch = useDispatch();

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
        dispatch(authActions.signUp(email, password));
    }

    const signInHandler = () => {
        dispatch(authActions.login(email, password));
    }

    const saveData = async () => {
        try {
            const response = fetch(`https://fin-accounter-default-rtdb.firebaseio.com/users/${userDataStore.userId}/userData.json?auth=${userDataStore.token}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: userName
                })
            });
            const res = (await response).json();
            res.then(data => {
                console.log(data);
            })
        }catch (e) {
            console.log(e);
        }
    }

    const getData = async () => {
        try {
            const response = fetch(`https://fin-accounter-default-rtdb.firebaseio.com/users/${userDataStore.userId}/userData.json?auth=${userDataStore.token}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const jsonData = (await response).json();
            jsonData.then(data => {
                console.log(data.name);
            })

        }catch (e) {
            console.log(e);
        }
    }

  return(
      <div>

              <p>email</p>
              <input type="email" value={email} onChange={emailChangeHandler}/>
              <p>password</p>
              <input value={password} onChange={passwordChangeHandler}/>
              <button onClick={signUpHandler}>Sig up</button>
              <button onClick={signInHandler}>Sign in</button>
              <p>user name: </p>
              <input value={userName} onChange={userNameChangeHandler} />
              <button onClick={saveData}>Add info</button>
                <button onClick={getData}>get info</button>

      </div>
  );
}

export default Authenctication;
