import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';
import TextInput from '../../../utils/TextInput';

function LoginPage(props) {

  const dispatch = useDispatch();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    let body = {
      email,
      password,
    }
    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess){
          props.history.push('/');
        } else {
          alert('Error');
        }
      });
  }

  return (
    <div>
      Entering the sroovyroom201

      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <TextInput 
          label="E-mail"
          type="email"
          value={email}
          onChange={onEmailHandler}
        />
        {/* <label>E-mail</label>
        <input type="email" value={email} onChange={onEmailHandler}/> */}
        <label>password</label>
        <input type="password" value={password} onChange={onPasswordHandler}/>
        <br />
        <button>Login</button>
      </form>
    </div>
  )
}

export default withRouter(LoginPage);
