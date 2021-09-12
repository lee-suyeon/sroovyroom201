import React, { useState } from 'react'
import styled from 'styled-components'

import TextInput from 'utils/TextInput'
import ReplyMessage from './ReplyMessage'

import moment from 'moment'
import Axios from 'axios';
import { Heart, Send } from 'react-feather';

const MessageForm = styled.div`
  // margin-bottom: 0.8rem;
`

const MessageBody = styled.div`
  font-size: 0.8rem;
  line-height: 1.6;
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
    font-size: 0.6rem;
    color: ${({ theme }) => theme.lightGray };
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

  .reply, .like {
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

function SingleMessage({ message, refreshMessage, userData, changeTimeFormat, messageList, parentMessageId }) {
  const [ openReply, setOpenReply ] = useState(false);
  const [ comment, setComment ] = useState("");
  const [ showComment, setShowComment ] = useState(false);
  const { writer, temporaryUser, content, createdAt } = message;

  const isAuth = userData && userData.isAuth;
  
  const replyHandler = () => {
    setOpenReply(prev => !prev)
  }

  const showCommentHandler = () => {
    setShowComment(prev => !prev);
  }

  const onChangeComment = (e) => {
    setComment(e.currentTarget.value)
  }

  const onSubmitComment = (e) => {
    e.preventDefault();

    let body = {
      writer: userData._id,
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

        { isAuth && 
          <MessageFooter>
            <div>
              <div className="reply" onClick={replyHandler}> Reply</div>
              <div className="like">Like</div>
              <div className="comment" onClick={showCommentHandler}>Comment</div>
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

        { !openReply && showComment &&
          <ReplyMessage
            messageList={messageList}
            parentMessageId={parentMessageId}
            userData={userData}
            refreshMessage={refreshMessage}
            changeTimeFormat={changeTimeFormat}
          />
        }
      </MessageForm>
  )
}

export default SingleMessage