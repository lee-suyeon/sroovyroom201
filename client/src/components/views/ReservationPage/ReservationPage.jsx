import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SideNav from 'components/views/SideNav/SideNav';
import { PageContent, TextLogo } from 'utils';

import moment from 'moment';
import VisitDate from './VisitDate';
import HeadCount from './HeadCount';
import VisitTime from './VisitTime';
import DinnerMenu from './DinnerMenu';
import BookerInfo from './BookerInfo';
import InfoAgreement from './InfoAgreement';

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
  const [ visitDate, setVisitDate ] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })
  const [ nights, setNights ] = useState(0);
  const [ headCount, setHeadCount ] = useState(1);
  const [ visitTime, setVisitTime ] = useState(1);
  const [ dinnerMenu, setDinnerMenu ] = useState(1);
  const [ bookerInfo, setBookerInfo ] = useState({
    booker: "",
    email: "",
  });
  const [ infoAgreement, setInfoAgreement ] = useState(false);

  useEffect(() => {
    const { startDate, endDate } = visitDate;

    setNights(moment(endDate).diff(startDate, 'days'));
  }, [visitDate.startDate, visitDate.endDate])

  const handleVisitDateChange = (type, e) => {
    setVisitDate({
      ...visitDate,
      [type]: e
    })
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

  const handleInfoAgreementChange = () => {
    setInfoAgreement(prev => !prev);
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
        {/* 방문날짜 */}
        <VisitDate 
          visitDate={visitDate}
          nights={nights}
          onChange={handleVisitDateChange}
        />

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

        {/* 개인정보동의 */}
        <InfoAgreement 
          infoAgreement={infoAgreement}
          onChange={handleInfoAgreementChange}
        />
      </ReservationForm>
    </ContentPage>
  )
}

export default ReservationPage;

