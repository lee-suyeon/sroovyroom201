import React from 'react'
import styled from 'styled-components'
import Avatar from 'utils/Avatar'

const Comment = styled.div`
  width: 100%;
  display: flex;
  padding-left: 1rem;
  margin-top: 0.8rem;

  & .reply {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.7rem;
  }

  & .writer {
    font-weight: 500;
  }

  & .timestamp {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.6rem;
    color: ${({ theme }) => theme.lightGray };
  }

  & .content {
    font-size: 0.7rem;
    line-height: 1.6;
  }

  & .avatar {
    margin-right: 0.7rem;

    div {
      width: 35px;
      height: 35px;
      background: ${({ theme }) => theme.mainColor };
      border-radius: 50%;
      font-size: 1.1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`

function ReplyMessage ({ messageList, parentMessageId, avatar, changeTimeFormat }) {
  const renderReplyComment = (parentMessageId) => 
    messageList.map((message, idx) => {
      if(message.responseTo === parentMessageId) {
        return (
          <Comment key={`comment${idx}`}>
            <div className="avatar">
              <Avatar avatar={avatar}/>
            </div>
            <div style={{ width: "100%" }}>
              <div className="reply">
                <div className="writer">{message.writer.name}</div>
                <div className="timestamp">{changeTimeFormat(message.createdAt)}</div>
              </div>
              <div className="content">{message.content}</div>
            </div>
          </Comment>
        )
      }
    }
  )

  return(
    <div>
      {renderReplyComment(parentMessageId)}
    </div>
  )
}

export default ReplyMessage