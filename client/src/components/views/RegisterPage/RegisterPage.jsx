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
import SelectBox from '../../../utils/SelectBox';
import { Title, Text } from '../../../utils/Typo';

const mbtiList = [
  { idx: 0, name: "모르겠어요.", desc: "" },
  { idx: 1, name: "ISTJ", desc: "청렴결백 논리주의자" },
  { idx: 2, name: "ISFJ", desc: "용감한 수호자" },
  { idx: 3, name: "INFJ", desc: "선의의 옹호자" },
  { idx: 4, name: "INTJ", desc: "용의주도한 전략가" },
  { idx: 5, name: "ISTP", desc: "만능 재주꾼" },
  { idx: 6, name: "ISFP", desc: "호기심 많은 예술가" },
  { idx: 7, name: "INFP", desc: "열정적인 중재자" },
  { idx: 8, name: "INTP", desc: "논리적인 사색가" },
  { idx: 9, name: "ESTJ", desc: "엄격한 관리자" },
  { idx: 10, name: "ESFJ", desc: "사교적인 외교관" },
  { idx: 11, name: "ENFJ", desc: "정의로운 사회운동가" },
  { idx: 12, name: "ENTJ", desc: "대담한 통솔자" },
  { idx: 13, name: "ESTP", desc: "모험을 즐기는 사업가" },
  { idx: 14, name: "ESFP", desc: "자유로운 영혼의 연예인" },
  { idx: 15, name: "ENFP", desc: "재기발랄한 활동가" },
  { idx: 16, name: "ENTP", desc: "논쟁을 즐기는 변론가" },
]

const ContentPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-bottom: 2.5rem;

  form {
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
  }
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

  return (
    <ContentPage>
      <div className="top-content" style={{ padding: '1rem 0.5rem'}}>
        <Logo size="large" />
        <TextLogo size="large" />
        <Title>과 친구되기 </Title>
        <FreeDrink>
          <TextLogo size="small" color="text" />과 친구가 되면 웰컴 드링크🍹 한잔을 <br />무료로 드립니다. 
        </FreeDrink>
      </div>

      <Bar/>

      <form onSubmit={onSubmitHandler}>
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
          placeholder="당신의 MBTI는?"
          showPlaceholder={true}
        />
        <TextInput
          label={`To SROOVYROOM`}
          name="message"
          type="text"
          placeholder="하고싶은 말이 있으면 적어주세요. 없으면 서운해요."
          value={message}
          onChange={onChangeInput}
        />
        <Button fullWidth size="medium">친구맺기</Button>
      </form>
    </ContentPage>
  )
}

export default withRouter(RegisterPage);
