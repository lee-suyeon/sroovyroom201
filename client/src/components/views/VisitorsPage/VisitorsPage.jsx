import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Message from './Message';

import Logo from '../../../utils/Logo';
import TextLogo from '../../../utils/TextLogo';
import { Title, Text } from '../../../utils/Typo';
import TextInput from '../../../utils/TextInput';
import Bar from '../../../utils/Bar';

import { Send } from 'react-feather';

import Axios from 'axios';

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
  position: fixed;
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

  .send-btn {
    border: none;
    color: ${({ theme }) => theme.baseColor };
    margin-top: 15px;
  }
`

function VisitorsPage(props) {
  const [ guestComment, setGuestComment ] = useState("");
  const [ messages, setMessages ] = useState([]);

  useEffect(() => {

    Axios.post('/api/visitors/messages')
      .then(res => {
        if(res.data.success){
          setMessages(res.data.messages.reverse())
        } else {
          alert('방명록을 불러오는 데 실패했습니다. ')
        }
      })
  }, [messages])

  const GuestCommentHandler = e => {
    setGuestComment(e.target.value)
  }

  const SubmitHandler = e => {
    e.preventDefault();

    if(!guestComment) {
      return alert("내용을 입력해주세요.")
    }

    let body = {
      writer: props.user.userData._id,
      content: guestComment,
    }

    Axios.post('/api/visitors', body)
      .then(res => {
        if(res.data.success){
          alert("다음에 또 놀러오실거죠?😉")
          setGuestComment("");
        } else {
          alert("방명록 작성에 실패했습니다.")
        }
      })
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

      <Bar style={{ marginBottom: '1.5rem' }}/>

      <MessageWrapper>
        {messages&&messages.map((message, idx) => (
          <Message 
            key={`${idx}mgs`}
            message={message}
          />))
        }
      </MessageWrapper>

      <VisitorsForm onSubmit={SubmitHandler}>
        <TextInput
          value={guestComment}
          onChange={GuestCommentHandler}
          placeholder="방명록을 남겨주세요."
          maxLength="200"
        />
        <button 
          className="send-btn" 
          type="submit"
          onClick={SubmitHandler} 
        >
          <Send />
        </button>
      </VisitorsForm>

    </ContentPage>
  );
}

// height:400px;
// overflow-y: auto;
const MessageWrapper = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.textColor };
  padding: 0 0.8rem;
`

export default VisitorsPage