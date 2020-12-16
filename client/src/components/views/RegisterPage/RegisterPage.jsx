import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

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

function RegisterPage(props) {

  const dispatch = useDispatch();
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  }

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    if(password !== confirmPassword){
      return alert('비밀번호를 확인해주세요.');
    }

    let body = {
      email,
      name,
      password,
    }


    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success){
          props.history.push('/login');
        } else {
          alert('Failed to be friend');
        }
      });
  }


  return (
    <ContentPage>
      <Logo size="large" />
      <Text margin={"0 0 0.5rem"}>WELCOME!</Text>
      <Title>BE FRIEND WITH SROOVYROOM201</Title>

      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <TextInput 
          type="text"
          placeholder="name"
          value={name}
          onChange={onNameHandler}
        />
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
        <TextInput 
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <Button>GO</Button>
      </form>
      <a href = 'tel:010-9938-6438'>전화하기</a>
    </ContentPage>
  )
}

export default withRouter(RegisterPage);
