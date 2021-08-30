import React, { useState } from 'react'
import styled from 'styled-components'

import { useSelector } from 'react-redux';

import Axios from 'axios';
import TextInput from 'utils/TextInput';
import { Send, Meh } from 'react-feather';

import SingleMessage from './SingleMessage';

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

function Message({ messageList, refreshMessage }) {
  const user = useSelector(state => state.user);
  const [ guestComment, setGuestComment ] = useState("");

  const commentHandler = e => {
    setGuestComment(e.target.value)
  }

  const SubmitHandler = e => {
    e.preventDefault();

    if(!guestComment) {
      return alert("내용을 입력해주세요.")
    }

    let temporaryUser = JSON.parse(localStorage.getItem("temporaryUser"))

    let body = {
      writer: user.userData._id,
      temporaryUser: temporaryUser,
      content: guestComment,
    }

    Axios.post('/api/visitors/saveVisitors', body)
      .then(res => {
        if(res.data.success){
          alert("다음에 또 놀러오실거죠?😉")
          setGuestComment("");
          refreshMessage(res.data.result);
          // window.scrollTo(0, 0);
        } else {
          alert("방명록 작성에 실패했습니다.")
        }
      })
  }

  return (
    <div style={{ marginBottom: '4rem' }}>
      {messageList && messageList.map(( message, index ) => (
        (!message.responseTo &&
          <SingleMessage key={`message${index}`} message={message} refreshMessage={refreshMessage}/>)
      ))}

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
    </div>
  )
}

export default Message