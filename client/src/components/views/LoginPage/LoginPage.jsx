import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';

import styled from 'styled-components';
import Button from '../../../utils/Button';
import TextInput from '../../../utils/TextInput';
import Logo from '../../../utils/Logo';
import { Title, Text } from '../../../utils/Typo';

const ContentPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-bottom: 2.5rem;
`

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
    <ContentPage>
      <Logo size="large" />
      <Text margin={"0 0 0.5rem"}>WELCOME BACK!</Text>
      <Title>ENTERING THE SROOVYROOM201</Title>

      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <TextInput 
          type="email"
          placeholder="e-mail"
          value={email}
          onChange={onEmailHandler}
        />
        <TextInput 
          type="password"
          placeholder="password"
          value={password}
          onChange={onPasswordHandler}
        />
        <Button>ENTER</Button>
      </form>
      <Text 
        textAlign={"center"}
        textDecoration={"underline"}
        margin={"2rem 0 0 0"}
      >
        BE FRIEND WITH SROOVYROOM
      </Text>
    </ContentPage>
  )
}

export default withRouter(LoginPage);
