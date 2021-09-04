import React, { useState } from 'react'
import styled from 'styled-components'

import { useSelector } from 'react-redux';

import TextInput from 'utils/TextInput'
import moment from 'moment'
import Axios from 'axios';
import { Heart, Send } from 'react-feather';

const MessageForm = styled.div`
  padding: 1rem 1rem 0.5rem;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 4rem;
  }

  &:nth-child(2n) {
    background: ${({ theme }) => theme.paleGray };
  }
`

const MessageBody = styled.div`
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: 1rem;
`

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h5 {
    font-size: 0.9rem;
    font-weight: 500;
  }

  & .timestamp {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    color: ${({ theme }) => theme.lightGray };
    font-weight: 500;
  }
`

const MessageFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.mainColor };

  & > div {
    display: flex;
    font-size: 0.8rem;
  }

  & .reply {
    margin-right: 0.5rem;
  }

  svg {
    width: 15px;
  }
`

const Reply = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.8rem;

  & .avatar {
    margin-right: 0.5rem;
  }
  
  & .avatar > div {
    width: 35px;
    height: 35px;
    background: ${({ theme }) => theme.mainColor };
    border-radius: 50%;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .reply-input {
    position: relative;
    width: 100%;
  }

  & .reply-input input {
    height: 2.2rem;
    width: 100%;
    font-size: 0.8rem;
    border: 1px solid ${({ theme }) => theme.mainColor };
    padding: 0.2rem 0.5rem;
    margin-bottom: 0;
  }

  & button {
    border: none;
    color: ${({ theme }) => theme.mainColor };
    position: absolute;
    top: 55%;
    right: 2px;
    transform: translateY(-50%);

    svg {
      width: 18px;
      stroke-width: 1.5px;
    }
  }
`

function SingleMessage({ message, refreshMessage, isAdmin }) {
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
    let message = `${days} days ago`

    if(days === 0) {
      message = "Today🔥" 
    }

    return message;
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
          <div className="timestamp">{changeTimeFormat(createdAt)}</div>
        </MessageHeader>

        <MessageBody>
          {content}
        </MessageBody>

        { isAdmin && 
          <MessageFooter>
            <div>
              <div className="reply" onClick={replyHandler}> Reply</div>
              <div className="like">Like</div>
            </div>
            <Heart />
          </MessageFooter>
        }

        { openReply &&
          <Reply>
            <div className="avatar">
              <div>	&nbsp;👩🏻</div>
            </div>
            <div className="reply-input">
              <TextInput
                value={comment}
                onChange={onChangeComment}
                placeholder="댓글을 남겨주세요."
                maxLength="200"
                style={{ marginBottom: 0 }}
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