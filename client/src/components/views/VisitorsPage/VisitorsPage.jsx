import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import styled from 'styled-components';

import Message from './Sections/Message';
import TextLogo from 'utils/TextLogo';
import PageContent from 'utils/PageContent';
import Nav from 'utils/Nav';
import Loading from 'utils/Loading';

import Axios from 'axios';

const GuestCount = styled.div`
  text-align: right;

  .count-number {
    color: ${({ theme }) => theme.mainColor };
  }
`

const MessageWrapper = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.textColor };
`

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
`

function VisitorsPage() {
  const userData = useSelector(state => state.user.userData);
  const [ messages, setMessages ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    setLoading(true);
    Axios.post('/api/visitors/getMessages')
      .then(res => {
        if(res.data.success){
          setLoading(false);
          setMessages(res.data.messages.reverse())
        } else {
          alert('방명록을 불러오는 데 실패했습니다. ')
        }
      })
  }, [])

  const refreshMessage = (newMessage) => {
    let newList = messages.reverse().concat(newMessage);
    setMessages(newList.reverse());
  }

  const countFor = () => {
    let count = 0;

    messages.forEach(message => {
      if(!message.hasOwnProperty("responseTo")) {
        count++;
      }
    })
    return count
  }

  const guestCount = (
    <GuestCount>
      <div>다녀간 손님🙆🏻 
        <span className="count-number">{countFor()}</span>명
      </div>
    </GuestCount>
  )

  const visitorTitle = (
    <div>
      <TextLogo size="large"/>에
      <p>흔적남기기 🐾</p>
    </div>
  )

  return(
    <div style={{ padding: '2rem' }}>
      <Nav />
      <PageContent 
        title={visitorTitle}
        desc={guestCount}
      />

      {loading ? 
        <Loader>
          <Loading />
        </Loader> :
        <MessageWrapper>
          <Message messageList={messages} refreshMessage={refreshMessage} userData={userData}/> 
        </MessageWrapper>
      }
    </div>
  );
}



export default VisitorsPage