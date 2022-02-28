import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import SideNav from 'components/views/SideNav/SideNav';
import { PageContent, TextLogo, Button, Modal } from 'utils';

import Axios from 'axios'
import moment from 'moment';

import VisitDate from './VisitDate';
import HeadCount from './HeadCount';
import VisitTime, { visitTimeList } from './VisitTime';
import DinnerMenu, { dinnerMenuList } from './DinnerMenu';
import BookerInfo from './BookerInfo';
import InfoAgreement from './InfoAgreement';
import BookingConfirmModal from './BookingConfirmModal'

const ContentPage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 2rem;
`

const BookingForm = styled.div`
  padding: 0 0.5rem;

  & > div {
    margin-bottom: 2rem;
  }

  & > div:last-child {
    margin-bottom: 5rem;
  }
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
  const userData = useSelector(state => state.user.userData);
  const [ visitDate, setVisitDate ] = useState({
    checkIn: new Date(),
    checkOut: new Date(),
  })
  const [ nights, setNights ] = useState(0);
  const [ headCount, setHeadCount ] = useState(1);
  const [ visitTime, setVisitTime ] = useState(1);
  const [ dinnerMenu, setDinnerMenu ] = useState(1);
  const [ bookerInfo, setBookerInfo ] = useState({
    booker: userData?.isAuth ? userData.name : "",
    email: userData?.isAuth ? userData.email : "",
  });
  const [ infoAgreement, setInfoAgreement ] = useState(false);
  const [ confirmModal, setConfirmModal ] = useState(false);

  useEffect(() => {
    const { checkIn, checkOut } = visitDate;
    setNights(moment(checkOut).diff(moment(checkIn), 'days'));
  }, [visitDate.checkIn, visitDate.checkOut])

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

  const handleConfirmModalToggle = () => {
    setConfirmModal(prev => !prev);
  }

  const createBookingData = () => {
    const { booker, email } = bookerInfo;
    const { checkIn, checkOut } = visitDate;

    let result = {
      booker,
      email,
      checkIn,
      checkOut,
      nights,
      visitTime: visitTimeList.find(list => list.value === visitTime).time,
      headCount,
      dinnerMenu: dinnerMenuList.find(list => list.value === dinnerMenu).menu,
      infoAgreement,
    };

    return result;
  }

  const confirmBooking = () => {
    booking();
    sendMail();
  }

  const booking = () => {
    Axios.post('/api/booking', createBookingData())
      .then(res => {
        if(res.data.success) {
          handleConfirmModalToggle();
        } else {
          alert('예약 실패했습니다.');
        }
      })
  }

  const sendMail = () => {
    Axios.post('/api/booking/booking', createBookingData())
      .then(res => {
        if(res.data.success) {
          alert('메일 전송')
        } else {
          alert('메일 실패');
        }
      })
  }

  const BookingTitle = (
    <div>
      <TextLogo size="large" />
      <p>예약하기</p>
    </div>
  )

  return(
    <ContentPage>
      <SideNav />
      <PageContent 
        title={BookingTitle}
        desc="📒 방문전에 예약해주세요."
      />
      <BookingForm>
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
      </BookingForm>

      <Button 
        fullWidth={true}
        float={true}
        onClick={handleConfirmModalToggle}
      >
        예약하기
      </Button>

      {confirmModal &&
        <BookingConfirmModal
          bookingInfo={createBookingData()}
          onToggle={handleConfirmModalToggle}
          onConfirm={confirmBooking}
        />
      }
    </ContentPage>

  )
}

export default ReservationPage;

