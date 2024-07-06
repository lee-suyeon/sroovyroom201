import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import styled from "styled-components";
import moment from "moment";

import { loginUser } from "_actions/user_action";
import SideNav from "components/views/SideNav/SideNav";
import { Button, TextInput, PageContent, TextLogo } from "utils";
import { PhoneCall, UserPlus } from "react-feather";
import { toast } from "react-toastify";

const ContentPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 2rem;
`;

const DayCounter = styled.div`
  text-align: right;
  color: ${({ theme }) => theme.textColor};

  & > span {
    color: ${({ theme }) => theme.mainColor};
    font-weight: 500;
  }
`;

const IconButton = styled.div`
  flex: 1 1;
  color: ${({ theme }) => theme.mainColor};
  text-align: center;

  span {
    display: block;
    line-height: 1.5;
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1rem;
`;

function LoginPage(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dayCount = moment().diff(moment("2020-10-18"), "days");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = () => {
    let body = {
      email,
      password,
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/menu");
      } else {
        setEmail("");
        setPassword("");
        toast.error("아이디와 비밀번호를 확인해주세요!");
      }
    });
  };

  const checkInTitle = (
    <div>
      <TextLogo size="large" />
      <p>체크인하기</p>
    </div>
  );

  const dayCounter = (
    <DayCounter>
      🏡 독립 <span> {dayCount}</span>일 째
    </DayCounter>
  );

  return (
    <ContentPage>
      <PageContent title={checkInTitle} desc={dayCounter}></PageContent>

      <InputForm onSubmit={onSubmitHandler}>
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
          autoComplete="on"
          onChange={onPasswordHandler}
        />
      </InputForm>
      <ButtonGroup>
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
      </ButtonGroup>
      <Button fullWidth float size="medium" onClick={onSubmitHandler}>
        ENTER
      </Button>
    </ContentPage>
  );
}

export default withRouter(LoginPage);
