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
`

const AvatarWrapper = styled.div`
  position: relative;
  width: 25px;
  height: 25px;
  background: ${({ theme }) => theme.mainColor };
  border-radius: 50%;
  padding: 0.8rem;
  margin-right: 0.5rem;

  & > div {
    position: absolute;
    top: 48%;
    left: 58%;
    transform: translate(-50%, -50%);
  }
`

function ReplyMessage ({ messageList, parentMessageId, avatar, changeTimeFormat }) {
  const renderReplyComment = (parentMessageId) => 
    messageList.map((message, idx) => {
      if(message.responseTo === parentMessageId) {
        return (
          <Comment key={`comment${idx}`}>
            <AvatarWrapper>
              <Avatar avatar={avatar}/>
            </AvatarWrapper>
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