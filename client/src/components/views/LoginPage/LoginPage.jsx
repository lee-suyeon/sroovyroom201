import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import moment from 'moment';

import { loginUser } from '../../../_actions/user_action';

import styled from 'styled-components';
import Button from '../../../utils/Button';
import TextInput from '../../../utils/TextInput';
import Logo from '../../../utils/Logo';
import TextLogo from '../../../utils/TextLogo';
import Bar from '../../../utils/Bar';
import { Title, Text } from '../../../utils/Typo';

import { PhoneCall, UserPlus } from 'react-feather';

const ContentPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-bottom: 2.5rem;
`

const DayCounter = styled.div`
  text-align: right;
  color: ${({ theme }) => theme.textColor };

  .day-counter {
    color:  ${({ theme }) => theme.mainColor };
  }
`

const IconButton = styled.div`
  flex: 1 1;
  color: ${({ theme }) => theme.mainColor };
  text-align: center;

  span {
    display: block;
    line-height: 1.5;
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }
`

function LoginPage(props) {

  const dispatch = useDispatch();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const dayCount = moment().diff(moment('2020-10-18'), "days");

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
      <div className="top-content" style={{ padding: '1rem'}}>
        <Logo size="large" />
        <TextLogo size="large" />
        <Title>체크인하기</Title>
        <DayCounter>
          독립 
          <span className="day-counter"> {dayCount}</span>
          일 째
        </DayCounter>
      </div>

      <Bar/>

      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <TextInput 
          type="email"
          label="E-mail"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={onEmailHandler}
        />
        <TextInput
          type="password"
          label="Password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={onPasswordHandler}
        />
        <div style={{ display: 'flex', width: '100%', marginBottom: '2rem' }}>
          <IconButton>
            <a href="tel:01099386438">
              <PhoneCall />
              <span>
                아무것도 기억이 안나요. <br />
                호스트에게 전화 걸기
              </span>
            </a>
          </IconButton>
          <IconButton>
            <Link to="/register">
              <UserPlus />
              <span>
                아직 친구가 아니에요. <br />
                친구하러 가기
              </span>
            </Link>
          </IconButton>
        </div>
        <Button fullWidth size="medium">ENTER</Button>
      </form>
    </ContentPage>
  )
}

export default withRouter(LoginPage);
