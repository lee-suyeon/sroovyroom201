import React  from 'react';
import styled from 'styled-components';

import { FormTitle } from './BookingPage';
import { default as DatePicker }  from 'utils/Calendar';
import moment from 'moment';

import { Calendar } from 'react-feather'; 

const VisitDateForm = styled.div`

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

function VisitDate ({ visitDate, nights, onChange }) {
  let validNights = nights >= 0

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
            selectedDate={visitDate.startDate}
            onChange={(e) => onChange('startDate', e)}
            minDate={moment().toDate()}
            />
        </div>
        <div className="check-out">
          <span>체크아웃</span>
          <DatePicker 
            selectedDate={visitDate.endDate}
            onChange={(e) => onChange('endDate', e)}
            minDate={moment().toDate()}
            maxDate={moment().add('1', 'M').toDate()}
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
    </VisitDateForm>
  )
}

export default VisitDate;