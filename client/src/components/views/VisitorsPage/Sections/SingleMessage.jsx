import React, { useState } from 'react'
import styled from 'styled-components'

import { useSelector } from 'react-redux';

import TextInput from 'utils/TextInput'
import moment from 'moment'
import Axios from 'axios';
import { Heart, Send, CornerDownRight } from 'react-feather';

const MessageForm = styled.div`
  //border-bottom: 1px solid ${({ theme }) => theme.mainColor };
  margin-bottom: 2rem;
  padding: 0 0.8rem;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
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



  &:last-child {
    margin-bottom: 4rem;
  }
`

const MessageHeader = styled.div`
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

  & .timestamp {
    font-size: 0.7rem;
    color: #555;
    font-weight: 500;
    display: flex;
    justify-content: flex-end;
    font-family: 'Montserrat', sans-serif;
  }
`

const MessageFooter = styled.div`
  display: flex;
  color: ${({ theme }) => theme.mainColor };
  justify-content: space-between;

  & > div {
    display: flex;
    font-size: 0.8rem;
  }

  & .reply {
    margin-right: 0.5rem;
  }
`

const Reply = styled.div`
  display: flex;
  //background-color: ${({ theme }) => theme.lightGreen };

  & .avatar {
    text-align: center;
    margin-right: 0.5rem;
  }

  & .avatar > div {
    width: 40px;
    height: 40px;
    background: ${({ theme }) => theme.mainColor };
    border-radius: 50%;
    font-size: 1.5rem;
    margin-bottom: 0.2rem;
  }

  & .avatar > p {
    font-size: 0.5rem;
  }

  & .reply-input {
    // width: 100%;
    position: relative;

    & > input {
      width: 100%;
      border: none;
      background: transparent;
    }
  }

  & button {
    border: none;
    color: ${({ theme }) => theme.mainColor };
    position: absolute;
    top: 0;
    right: 0;
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
    const now = moment()
    const days = now.diff(time, "days")

    return days;
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
      <MessageForm>
        <MessageHeader>
          <h5>
            {writer ? `💌 ${writer.name}` : `🥷🏼 ${temporaryUser}`}
          </h5>
          <div className="timestamp">{`${changeTimeFormat(createdAt)} days ago`}</div>
        </MessageHeader>
        <p>{content}</p>
        <MessageFooter>
          <div>
            <div className="reply" onClick={replyHandler}> Reply</div>
            <div className="like">Like</div>
          </div>
          <Heart />
        </MessageFooter>
        { openReply &&
          <Reply>
            <div className="avatar">
              <div>👩🏻</div>
              <p>SROOVY</p>
            </div>
            <div className="reply-input">
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
                onClick={onSubmitComment} 
              >
                <Send />
              </button>
            </div>
          </Reply>
        }
      </MessageForm>
  )
}

export default SingleMessage