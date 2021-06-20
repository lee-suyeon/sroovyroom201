import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Message from './Message';

import TextInput from 'utils/TextInput';
import PageContent from 'utils/PageContent';
import Nav from 'utils/Nav';

import { Send, Meh } from 'react-feather';

import Axios from 'axios';
import TextLogo from 'utils/TextLogo';

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
  padding: 1.2rem 2rem;

  > div {
    width: 100%;
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
  }
`

const MessageWrapper = styled.div`
  width: 100%;
  min-height: 250px;
  color: ${({ theme }) => theme.textColor };
  padding: 0 0.8rem 3.5rem;
`

const NoDataMessage = styled.div`
  text-align: center;
  margin-top: 3rem;

  & > svg {
    margin-bottom: 0.4rem;
    color: ${({ theme }) => theme.mainColor };
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
          window.scrollTo(0, 0);
        } else {
          alert("방명록 작성에 실패했습니다.")
        }
      })
  }

  const guestCount = (
    <GuestCount>
      <div>다녀간 손님🙆🏻 <span className="count-number">12</span>명</div>
    </GuestCount>
  )

  return(
    <div className="visitors-page">
      <div style={{ padding: '2rem'}}>
        <Nav />
        <PageContent 
            title="흔적 남기기"
            desc={guestCount}
        />

        <MessageWrapper>
          {messages.length > 0 ?
            messages.map((message, idx) => 
            <Message 
              key={`${idx}mgs`}
              message={message}
              />
            ) : 
            <NoDataMessage>
              <Meh />
              <p>
                <TextLogo 
                  size="medium"
                  color="text"
                  /> is lonely.
              </p>
            </NoDataMessage>
            }
        </MessageWrapper>
      </div>

        <VisitorsForm onSubmit={SubmitHandler}>
          <TextInput
            value={guestComment}
            onChange={GuestCommentHandler}
            placeholder="방명록을 남겨주세요."
            maxLength="200"
            style={{ marginBottom: '1rem' }}
            
          />
          <button 
            className="send-btn" 
            type="submit"
            onClick={SubmitHandler} 
          >
            <Send />
          </button>
        </VisitorsForm>
    </div>
  );
}



export default VisitorsPage