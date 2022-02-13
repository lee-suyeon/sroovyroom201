import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SideNav from 'components/views/SideNav/SideNav';
import { PageContent, TextLogo } from 'utils';

import { Calendar, Users } from 'react-feather';
import moment from 'moment';
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

const FormTitle = styled.div`
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

const HeadCount = styled.div`
  margin-bottom: 1.5rem;

  .select-head {
    display: flex;
    justify-content: space-between;
  }

  .select-head > button {
    border: none;
    text-align: center;
    padding: 0.5rem;
  }

  button.selected {
    background-color: ${({ theme }) => theme.mainColor };
    color: ${({ theme }) => theme.white };
    border-radius: 5px;
  }

  .select-head span {
    font-size: 2rem;
    letter-spacing: -5px;
  }

  .select-head p {
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
`
const headCountList = [
  { value: 1, desc: "혼자 갈게요.", emoji: "🧍🏻", emoji2: "🕺🏻"},
  { value: 2, desc: "둘이 갈게요.", emoji: "🧍🏻🧍🏻", emoji2: "🕺🏻🕺🏻"},
  { value: 3, desc: "셋이 갈게요.", emoji: "🧍🏻🧍🏻🧍🏻", emoji2: "🕺🏻🕺🏻🕺🏻"},
]

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

  const headCountChangeHandler = (count) => {
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
      <HeadCount>
        <FormTitle>
          <Users />
          <span className="sub-title">몇 명이서 오시나요?</span>
        </FormTitle>
        <div className="select-head">
          {headCountList.map((head, idx) => 
            <button 
              key={`head${idx}`}
              onClick={() => headCountChangeHandler(head.value)}
              value={headCount}
              className={ headCount == head.value ? 'selected' : "" }
            >
              <span>{ headCount == head.value ? head.emoji2 : head.emoji }</span>
              <p>{head.desc}</p>
            </button> 
          )}
        </div>
      </HeadCount>
    </ContentPage>
  )
}

export default ReservationPage;

