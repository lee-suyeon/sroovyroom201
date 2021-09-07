import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import SingleMessage from './SingleMessage'

import TextInput from 'utils/TextInput'
import moment from 'moment'
import Axios from 'axios';
import { Heart, Send } from 'react-feather'

const ViewComment = styled.div`
  font-size: 0.8rem;
`

function ReplyMessage ({ messageList, userData, parentMessageId, refreshMessage }) {
  const [ childeMessageNumber, setChildMessageNumber ] = useState(0)
  
  useEffect(() => {
    let commentNumber = 0;

    messageList.map(comment => {
      if(comment.responseTo === parentMessageId) {
        commentNumber++;
      }
    })

    setChildMessageNumber(commentNumber);
  }, [])

  const renderReplyComment = () => 
  messageList.map((message, idx) => (
    <React.Fragment>
      {message.responseTo === parentMessageId &&
        <div>
          <SingleMessage 
            key={`message${idx}`} 
            message={message} 
            userData={userData}
            refreshMessage={refreshMessage} 
          />
          <ReplyMessage 
            messageList={messageList}
            parentMessageId={message.id}
            userData={userData}
            refreshMessage={refreshMessage} 
            />
        </div>
      }
    </React.Fragment>
  ))

  return(
    <div>
      {setChildMessageNumber > 0 &&
        <ViewComment>
          답글 1개 보기
        </ViewComment>
      }
      {renderReplyComment()}
    </div>
  )
}

export default ReplyMessage