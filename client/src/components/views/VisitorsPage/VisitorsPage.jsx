import React, { useState } from 'react';
import styled from 'styled-components';

import Logo from '../../../utils/Logo';
import TextLogo from '../../../utils/TextLogo';
import { Title, Text } from '../../../utils/Typo';
import TextInput from '../../../utils/TextInput';
import Bar from '../../../utils/Bar';

import { Send } from 'react-feather';

const ContentPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-bottom: 2.5rem;
`

const GuestCount = styled.div`
  text-align: right;

  .count-number {
    color: ${({ theme }) => theme.mainColor };
  }
`

const VisitorsForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: 0; left: 0;
  color: ${({ theme }) => theme.baseColor };
  background: ${({ theme }) => theme.mainColor };
  padding: 1rem 2rem 2rem;

  > div {
    margin-bottom: 0;
  }

  input {
    width: 95%;
    color: ${({ theme }) => theme.baseColor };
    border-bottom: 1px solid #fafafa;
  }

  input::placeholder {
    color: ${({ theme }) => theme.baseColor };
  }

  input:focus {
    border-bottom: 2px solid ${({ theme }) => theme.baseColor };
  }

`

function VisitorsPage() {
  const [ GuestComment, setGuestComment ] = useState("");

  const onGuestCommentHandler = e => {
    setGuestComment(e.target.value)
  }

  return(
    <ContentPage>
      <div className="top-content" style={{ padding: '1rem'}}>
        <Logo size="large" />
        <Title>
          <TextLogo size="large" />에 <br /> 흔적 남기기
        </Title>
        <GuestCount>
          <div>다녀간 손님🙆🏻 <span className="count-number">12</span>명</div>
        </GuestCount>
      </div>

      <Bar />

      <div style={{ height: "400px", overflowY: "auto" }}>
        방명록 내용
      </div>

      <VisitorsForm>
        <TextInput
          onChange={onGuestCommentHandler}
          placeholder="방명록을 남겨주세요."
        />
        <Send />
      </VisitorsForm>

    </ContentPage>
  );
}

export default VisitorsPage