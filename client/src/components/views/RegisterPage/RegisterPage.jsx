import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

import styled from 'styled-components';
import Button from '../../../utils/Button';
import TextInput from '../../../utils/TextInput';
import Logo from '../../../utils/Logo';
import TextLogo from '../../../utils/TextLogo';
import Bar from '../../../utils/Bar';
import { Title, Text } from '../../../utils/Typo';

const ContentPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-bottom: 2.5rem;
`

const FreeDrink = styled.div`
  font-size: 0.8rem;
`

function RegisterPage(props) {

  const dispatch = useDispatch();
  const [ inputs, setInputs ] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
  })
  const [ mbti, setMbti ] = useState("");
  const { name, email, password, message } = inputs;

  const onChangeInput = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
  
    let body = {
      email,
      name,
      password,
      mbti,
      message,
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
      <div className="top-content" style={{ padding: '1rem'}}>
        <Logo size="large" />
        <TextLogo size="large" />
        <Title>과 친구되기 </Title>
        <FreeDrink>
          <TextLogo size="small" color="text" />과 친구가 되면 웰컴 드링크🍹 한잔을 <br />무료로 드립니다. 
        </FreeDrink>
      </div>

      <Bar/>

      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <TextInput
          label="E-mail"
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={onChangeInput}
        />
        <TextInput 
          label="Name"
          type="text"
          name="name"
          placeholder="이름 또는 별명을 알려주세요"
          value={name}
          onChange={onChangeInput}
        />
        <TextInput
          label="Password"
          type="password"
          name="password"
          placeholder="나만 아는 비밀번호로 입력해주세요."
          value={password}
          onChange={onChangeInput}
        />
        <TextInput 
          label="MBTI"
          type="select"
          placeholder="당신의 MBTI는?"
        />
        <TextInput
          label="To SROOVYROOM201"
          name="message"
          type="text"
          placeholder="하고싶은 말이 있으면 적어주세요. 없으면 서운해요."
          value={message}
          onChange={onChangeInput}
        />
        <Button>친구맺기</Button>
      </form>
    </ContentPage>
  )
}

export default withRouter(RegisterPage);
