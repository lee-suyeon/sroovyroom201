import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SideNav from 'components/views/SideNav/SideNav';
import { PageContent, TextLogo } from 'utils';

import { Calendar } from 'react-feather';
import moment from 'moment';
import DateForm from './DateForm';
import HeadCount from './HeadCount';
import VisitTime from './VisitTime';
import DinnerMenu from './DinnerMenu';
import BookerInfo from './BookerInfo';

const ContentPage = styled.div`
  height: 100%;
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
  const [ visitTime, setVisitTime ] = useState(1);
  const [ dinnerMenu, setDinnerMenu ] = useState(1);
  const [ bookerInfo, setBookerInfo ] = useState({
    booker: "",
    email: "",
  })

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

  const handleVisitTimeClick = (time) => {
    setVisitTime(time);
  }

  const handleDinnerMenuChange = (menu) => {
    setDinnerMenu(menu);
  }

  const handleBookerInfoChange = (e) => {
    const { name, value } = e.target;
    setBookerInfo({
      ...bookerInfo,
      [name]: value
    })
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

      {/* 방문시간 */}
      <VisitTime 
        visitTime={visitTime}
        onClick={handleVisitTimeClick}
      />
  
      {/* 인원수 */}
      <HeadCount 
        headCount={headCount}
        onClick={handleHeadCountClick}
      />

      {/* 메뉴 */}
      <DinnerMenu 
        dinnerMenu={dinnerMenu}
        onChange={handleDinnerMenuChange}
      />

      {/* 예약자 정보 */}
      <BookerInfo 
        bookerInfo={bookerInfo}
        onChange={handleBookerInfoChange}
        />

    </ContentPage>
  )
}

export default ReservationPage;

