import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

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

  &:last-child{
    margin-bottom: 4rem;
  }
`

const changeTimeFormat = (time) => {
  const timeFormat = moment(time).format("YYYY년 MM월 DD일에 다녀감")
  return timeFormat;
}

function Message({ message }) {
  const { writer, content, createdAt, temporaryUser } = message;

  return (
    <MessageForm>
      <div>
        <h5>
          💌 {writer ? writer.name : temporaryUser }
        </h5>
        {/* <Heart /> */}
      </div>
      <p>{content}</p>
      <div className="timestamp">{changeTimeFormat(createdAt)}</div>
    </MessageForm>
  )
}

export default Message