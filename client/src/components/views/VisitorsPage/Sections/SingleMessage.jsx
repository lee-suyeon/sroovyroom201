import React, { useState } from 'react'
import styled from 'styled-components'

import { useSelector } from 'react-redux';

import TextInput from 'utils/TextInput'
import moment from 'moment'
import Axios from 'axios';
import { Heart, Send } from 'react-feather';

const MessageForm = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.mainColor };
  margin-bottom: 1.5rem;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  h5 {
    font-size: 0.9rem;
    font-weight: 500;

    & > span {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 0.5rem;
      
      background-color: ${({ theme }) => theme.mainColor };
    }
  }

  p {
    font-size: 0.8rem;
    line-height: 1.4;
    margin-bottom: 1.2rem;
  }

  svg {
    width: 15px;
    color: ${({ theme }) => theme.mainColor };
  }

  .timestamp {
    font-size: 0.65rem;
    color: #555;
    display: flex;
    justify-content: flex-end;
  }

  &:last-child {
    margin-bottom: 4rem;
  }
`

function SingleMessage({ message, refreshMessage }) {
  const user = useSelector(state => state.user);
  const [ openReply, setOpenReply ] = useState(false);
  const [ comment, setComment ] = useState("");
  const { writer, temporaryUser, content, createdAt } = message;
  
  const replyHandler = () => {
    setOpenReply(prev => !prev)
  }

  const onChangeComment = (e) => {
    setComment(e.currentTarget.value)
  }

  const changeTimeFormat = (time) => {
    const timeFormat = moment(time).format("YYYY년 MM월 DD일에 다녀감")
    return timeFormat;
  }

  const onSubmitComment = (e) => {
    e.preventDefault();

    let body = {
      writer: user.userData._id,
      temporaryUser: temporaryUser,
      content: comment,
      responseTo: message._id
    }

    Axios.post('/api/visitors/saveVisitors', body)
      .then(res => {
        if(res.data.success){
          refreshMessage(res.data.result)
        } else {
          alert("방명록 작성에 실패했습니다.")
        }
      })

  }

  return (
    <React.Fragment>
      <MessageForm>
        <div>
          <h5>
            {writer ? `💌 ${writer.name}` : `🥷🏼 ${temporaryUser}`}
          </h5>
            <div onClick={replyHandler}>reply</div>
            <Heart />
        </div>
        <p>{content}</p>
      <div className="timestamp">{changeTimeFormat(createdAt)}</div>
      </MessageForm>
        { openReply &&
          <div>
            <TextInput
              value={comment}
              onChange={onChangeComment}
              placeholder="방명록을 남겨주세요."
              maxLength="200"
              style={{ marginBottom: '1rem' }}
            />
            <button 
              className="send-btn" 
              type="submit"
              // onClick={SubmitHandler} 
            >
              <Send />
            </button>
          </div>
        }
    </React.Fragment>
  )
}

export default SingleMessage