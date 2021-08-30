import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Message from './Sections/Message';
import TextLogo from 'utils/TextLogo';
import PageContent from 'utils/PageContent';
import Nav from 'utils/Nav';
import Loading from 'utils/Loading';

import { Meh } from 'react-feather';

import Axios from 'axios';

const GuestCount = styled.div`
  text-align: right;

  .count-number {
    color: ${({ theme }) => theme.mainColor };
  }
`

const MessageWrapper = styled.div`
  width: 100%;
  min-height: 250px;
  color: ${({ theme }) => theme.textColor };
  padding: 0 0.8rem 3.5rem;
`

const NoDataMessage = styled.div`
  text-align: center;
  margin-top: 3rem;

  & > svg {
    margin-bottom: 0.4rem;
    color: ${({ theme }) => theme.mainColor };
  }
`

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
`

function VisitorsPage() {
  const [ messages, setMessages ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    setLoading(true);
    Axios.post('/api/visitors/getMessages')
      .then(res => {
        if(res.data.success){
          setLoading(false);
          setMessages(res.data.messages)
        } else {
          alert('방명록을 불러오는 데 실패했습니다. ')
        }
      })
  }, [])

  const refreshMessage = (newMessage) => {
    setMessages(messages.concat(newMessage))
  }

  const guestCount = (
    <GuestCount>
      <div>다녀간 손님🙆🏻 
        <span className="count-number">{messages.length}</span>명
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
      <div>
        <Nav />
        <PageContent 
          title={visitorTitle}
          desc={guestCount}
        />
      </div>

      <div style={{ height: "300px" }}>
        {loading ? 
          <Loader>
            <Loading />
          </Loader> : 
          <MessageWrapper>
            {messages.length > 0 ? 
              <Message messageList={messages} refreshMessage={refreshMessage}/> : 
              <NoDataMessage>
                <Meh />
                <p>
                  <TextLogo size="medium" color="text"/> is lonely.
                </p>
              </NoDataMessage>
            }
          </MessageWrapper>
        }
      </div>
      
      
    </div>
  );
}



export default VisitorsPage