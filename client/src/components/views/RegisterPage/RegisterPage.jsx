import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '_actions/user_action';

import styled from 'styled-components';
import Button from 'utils/Button';
import TextInput from 'utils/TextInput';
import Logo from 'utils/Logo';
import TextLogo from 'utils/TextLogo';
import Bar from 'utils/Bar';
import SelectBox from 'utils/SelectBox';
import PageContent from 'utils/PageContent';
import { Title, Text } from 'utils/Typo';

import mbtiList from './mbti'

const ContentPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
`

const FreeDrink = styled.div`
  font-size: 0.8rem;
`

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 0 1rem 3rem;
`

function RegisterPage(props) {

  const dispatch = useDispatch();
  const [ inputs, setInputs ] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
  })
  const [ mbti, setMbti ] = useState(-1);
  const { name, email, password, message } = inputs;

  const onChangeInput = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const onChangeSelect = (e) => {
    setMbti(e.target.value);
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
          alert('회원가입에 성공했습니다!');
          props.history.push('/login');
        } else {
          alert('Failed to be friend');
        }
      });
  }

  const freeDrink = (
    <FreeDrink>
      <TextLogo size="small" color="text" />과 친구하면 웰컴 드링크🍹를 드려요!
    </FreeDrink>
  )

  return (
    <ContentPage>
      <PageContent
        title="과 친구되기"
        desc={freeDrink}
      >

      </PageContent>
      <Bar/>

      <InputForm onSubmit={onSubmitHandler}>
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
        <SelectBox
          label="MBTI"
          datas={mbtiList}
          value={mbti}
          onChange={onChangeSelect}
          placeholder="MBTI 알려주시겠어요?"
          showPlaceholder={true}
        />
        <TextInput
          label={`To SROOVYROOM`}
          name="message"
          type="text"
          placeholder="하고싶은 말을 적어주세요. 없으면 서운해요.😢"
          value={message}
          onChange={onChangeInput}
        />
        <Button fullWidth size="medium">FRIEND</Button>
      </InputForm>
    </ContentPage>
  )
}

export default withRouter(RegisterPage);
