import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SideNav from 'components/views/SideNav/SideNav';
import { PageContent, TextLogo } from 'utils';

import { Calendar, Users } from 'react-feather';
import moment from 'moment';
import HeadCount from './HeadCount';
import DateForm from './DateForm';

const ContentPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 2rem;
`

const ReservationForm = styled.div`
  padding: 0 0.5rem;
`

export const FormTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  .sub-title {
    color: ${({ theme }) => theme.textColor };
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 0.1rem;
  }

  & svg {
    width: 18px;
    margin-right: 0.3rem;
    color: ${({ theme }) => theme.textColor };
  }
`

function ReservationPage(props) {
  const [ startDate, setStartDate ] = useState(new Date());
  const [ endDate, setEndDate ] = useState(new Date());
  const [ nights, setNights ] = useState(0);
  const [ headCount, setHeadCount ] = useState(1);

  useEffect(() => {
    setNights(moment(endDate).diff(startDate, 'days'));
  }, [endDate, startDate])

  const dateChangeHandler = (type, e) => {
    if(type === "startDate") {
      setStartDate(e);
    } else {
      setEndDate(e);
    }
  }

  const handleHeadCountClick = (count) => {
    setHeadCount(count);
  }

  const reservationTitle = (
    <div>
      <TextLogo size="large" />
      <p>예약하기</p>
    </div>
  )

  return(
    <ContentPage>
      <SideNav />
      <PageContent 
        title={reservationTitle}
        desc="📒 방문전에 예약해주세요."
      />
      <ReservationForm>
        <div>
          <FormTitle>
            <Calendar />
            <div className="sub-title">방문날짜를 선택해주세요.</div>
          </FormTitle>
          <DateForm 
            startDate={startDate}
            endDate={endDate}
            nights={nights}
            onChange={dateChangeHandler}
          />
        </div>
      </ReservationForm>

      {/* 인원수 */}
      <HeadCount 
        headCount={headCount}
        onClick={handleHeadCountClick}
      />
    </ContentPage>
  )
}

export default ReservationPage;

