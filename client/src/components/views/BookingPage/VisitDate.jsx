import React  from 'react';
import styled from 'styled-components';

import { FormTitle } from './BookingPage';
import { default as DatePicker }  from 'utils/Calendar';
import moment from 'moment';

import { Calendar } from 'react-feather'; 

const VisitDateForm = styled.div`
  & > .invalid {
    color: ${({ theme }) => theme.pink };
    text-align: center;
    margin-top: 0.3rem;
  }
`

const VisitDatePicker = styled.div`
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;

  .check-in span,
  .check-out span,
  .period span {
    display: block;
    text-align: center;
    margin-bottom: 0.8rem;
  }

  .nights {
    width: 90px;
    height: 30px;
    padding: 0.2rem;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.mainColor };
    font-family: 'Montserrat', sans-serif;
    text-align: center;
    font-weight: 500;
    line-height: 22px;
  }

  .nights.invalid {
    color: ${({ theme }) => theme.pink };
  }
`

function VisitDate ({ checkIn, checkOut, nights, bookingList, onChange }) {
  let validNights = nights >= 0

  let disabledDate = [];
  bookingList.forEach(list => {
    if(list.nights === 0) {
      disabledDate.push(moment(list.checkIn).toDate())
    } else {
      for(let i = 0; i < list.nights + 1; i++) {
        disabledDate.push(moment(list.checkIn).add(i, 'd').toDate())
      }
    }
  })

  return (
    <VisitDateForm>
      <FormTitle>
        <Calendar />
        <div className="sub-title">방문날짜를 선택해주세요.</div>
      </FormTitle>
      <VisitDatePicker>
        <div className="check-in">
          <span>체크인</span>
          <DatePicker
            selectedDate={checkIn}
            onChange={(e) => onChange('checkIn', e)}
            excludeDates={disabledDate}
            minDate={moment().toDate()}
            maxDate={moment().add('2', 'M').toDate()}
            />
        </div>
        <div className="check-out">
          <span>체크아웃</span>
          <DatePicker 
            selectedDate={checkOut}
            onChange={(e) => onChange('checkOut', e)}
            excludeDates={disabledDate}
            minDate={moment().toDate()}
            maxDate={moment().add('2', 'M').toDate()}
          />
        </div>
        <div className="period">
          <span>기간</span>
          <div className={`nights ${validNights ? "" : "invalid"}`}>
            {validNights ?
              `${nights}박 ${nights + 1}일` :
              "?박 ?일"
            }
          </div>
        </div>
      </VisitDatePicker>
      {!validNights &&
        <div className={`${validNights ? "" : "invalid"}`}>
          ❗️날짜를 다시 선택해주세요.❗️
        </div>
      }
    </VisitDateForm>
  )
}

export default VisitDate;