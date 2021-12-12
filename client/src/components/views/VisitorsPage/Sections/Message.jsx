import React, { useState } from 'react'
import styled from 'styled-components'

import Axios from 'axios';
import moment from 'moment';

import { TextInput, TextLogo } from 'utils';
import { Send, Meh } from 'react-feather';
import SingleMessage from './SingleMessage'

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
  padding: 1rem 1rem 0.5rem;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 4rem;
  }

  &:nth-child(2n) {
    background: ${({ theme }) => theme.paleGray };
  }
`

const NoDataMessage = styled.div`
  text-align: center;
  margin-top: 3rem;

  & > svg {
    margin-bottom: 0.4rem;
    color: ${({ theme }) => theme.mainColor };
  }
`

function Message({ 
  messageList,
  refreshMessage,
  userData
}) {
  const [ guestComment, setGuestComment ] = useState("");

  const commentHandler = e => {
    setGuestComment(e.target.value)
  }

  const SubmitHandler = e => {
    e.preventDefault();

    if(!guestComment) {
      return alert("내용을 입력해주세요.")
    }

    let temporaryUser = !userData._id ? JSON.parse(localStorage.getItem("temporaryUser")) : null

    let body = {
      writer: userData._id,
      temporaryUser: temporaryUser,
      content: guestComment,
    }

    Axios.post('/api/visitors/saveVisitors', body)
      .then(res => {
        if(res.data.success){
          alert("다음에 또 놀러오실거죠?😉")
          setGuestComment("");
          refreshMessage(res.data.result);
          window.scrollTo(0, 0);
        } else {
          alert("방명록 작성에 실패했습니다.")
        }
      })
  }

  const changeTimeFormat = (time) => {
    const now = moment()
    const days = now.diff(time, "days")
    let message = `${days} days ago`

    if(days === 0) {
      message = "Today 🔥" 
    }

    return message;
  }

  const renderNoData = () => (
    <NoDataMessage>
      <Meh />
      <div>
        <TextLogo size="medium" color="text"/> is lonely.
      </div>
    </NoDataMessage>
  )

  return (
    <div style={{ marginBottom: '5rem' }}>
      {messageList.slice(0).reverse().map(( message, index ) => (
        // 대댓글이 아닌 메세지만 출력 - 첫번째 depth
        (!message.responseTo &&
          <MessageWrapper key={`message${index}`} >
            <SingleMessage 
              message={message} 
              userData={userData}
              messageList={messageList}
              refreshMessage={refreshMessage}
              changeTimeFormat={changeTimeFormat}
            />
          </MessageWrapper>
        )
      ))}
      {messageList.length < 1 && renderNoData()} 
      <VisitorsForm onSubmit={SubmitHandler}>
        <TextInput
          value={guestComment}
          onChange={commentHandler}
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
      {/* <div ref={messageEndRef}/> */}
    </div>
  )
}

export default Message