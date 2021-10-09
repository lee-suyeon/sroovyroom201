import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

import TextInput from 'utils/TextInput'
import ReplyMessage from './ReplyMessage'

import Axios from 'axios';
import { Heart, Send } from 'react-feather';
import { avatarList } from 'components/views/RegisterPage/selectList'

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
  font-size: 0.8rem;
  color: ${({ theme }) => theme.mainColor };

  .reply, .like {
    margin-right: 0.5rem;
  }

  .comment-count {
    color: ${({ theme }) => theme.white };
    display: inline-block;
    background: ${({ theme }) => theme.mainColor };
    padding: 0 0.15rem 0.1rem;
    border-radius: 2px;
    font-size: 0.6rem;
    font-weight: 500;
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
    background: ${({ theme }) => theme.lightGreen };
    border-radius: 50%;
    font-size: 1.1rem;
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

const Comment = styled.div`
  display: flex;
`

const Likes = styled.div`
  display: flex;
  align-items: center;

  & > span {
    margin-right: 0.3rem;
  }

  ${props =>
    props.like &&
    css`
      & > svg {
        fill: ${({ theme }) => theme.mainColor };
      }
    `}
`

function SingleMessage({ message, refreshMessage, userData, changeTimeFormat, messageList }) {
  const [ comment, setComment ] = useState("");
  const [ openReply, setOpenReply ] = useState(false);
  const [ showComment, setShowComment ] = useState(false);
  const [ commentNumber, setCommentNumber ] = useState(0);
  const [ likes, setLikes ] = useState(false);
  const [ countLikes, setCountLikes ] = useState(0);
  const [ avatar, setAvatar ] = useState("👻");
  const { writer, temporaryUser, content, createdAt } = message;

  const isAuth = userData && userData.isAuth;
  const userAvatar = userData && userData.avatar;

  const variable = {
    userId: userData._id,
    messageId: message._id
  }

  // count comment
  useEffect(() => {
    let commentNumber = 0;

    messageList.map(comment => {
      if(comment.responseTo === message._id) {
        commentNumber++;
      }
    })
    setCommentNumber(commentNumber)
  }, [messageList])

  // getLike
  useEffect(() => {
    Axios.post('/api/like/getLikes', variable)
      .then(res => {
        if(res.data.success) {
          setCountLikes(res.data.likes.length); // number of likes
          res.data.likes.map(like => {
            if(like.userId === userData._id) {
              setLikes(true);
            }
          })
        } else {
          console.error('failed get like')
        }
      })

      renderAvatar();
  }, [])
  
  const replyHandler = () => {
    setOpenReply(prev => !prev)
  }
  
  const showCommentHandler = () => {
    if(openReply) setOpenReply(false);
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
          setComment("");
          refreshMessage(res.data.result);
          setOpenReply(false);
          setShowComment(true);
        } else {
          alert("방명록 작성에 실패했습니다.")
        }
      })
  }

  const onLike = () => {
    if(!isAuth) {
      if(likes) {
        setLikes(false);
        setCountLikes(countLikes - 1);
      } else {
        setLikes(true);
        setCountLikes(countLikes + 1);
      }
    } else {
      if(likes) { // unlike
        Axios.post('/api/like/unLike', variable)
        .then(res => {
          if(res.data.success) {
            setLikes(false);
            setCountLikes(countLikes - 1);
          } else {
            console.error('failed unlike')
          }
        })
      } else { // uplike 
        Axios.post('/api/like/upLike', variable)
        .then(res => {
          if(res.data.success) {
            setLikes(true);
            setCountLikes(countLikes + 1);
          } else {
            console.error('failed like')
          }
        })
      }
    }
  }

  const renderAvatar = () => {
    if(userAvatar) { 
      let findEmoji = avatarList.find(list => list.idx === userAvatar);
      setAvatar(findEmoji.emoji);
    }
  }

  return (
    <div>
      <MessageHeader>
        <h5>
          {writer ? `💌 ${writer.name}` : `🥷🏼 ${temporaryUser}`}
        </h5>
        <div className="timestamp">{changeTimeFormat(createdAt)}</div>
      </MessageHeader>

      <MessageBody>
        {content}
      </MessageBody>

      <MessageFooter>
        <Comment>
        { isAuth && 
          <div className="reply" onClick={replyHandler}> Reply</div>
        }
          <div className="comment" onClick={showCommentHandler}>
            Comment{' '}
            {commentNumber !== 0 && <span className="comment-count">{commentNumber}</span>}
          </div>
        </Comment>
        <Likes onClick={onLike} like={likes}>
          <span>{countLikes}</span>
          <Heart />
        </Likes>
      </MessageFooter>

      { showComment &&
        <ReplyMessage
          messageList={messageList}
          parentMessageId={message._id}
          changeTimeFormat={changeTimeFormat}
        />
      }

      { openReply &&
        <Reply>
          <div className="avatar">
            <div>&nbsp;{avatar}</div>
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
    </div>
  )
}

export default SingleMessage