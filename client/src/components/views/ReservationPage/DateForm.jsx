import React from 'react';
import styled from 'styled-components';

import { default as DatePicker }  from 'utils/Calendar';
import moment from 'moment';

const CustomDateForm = styled.div`
  font-size: 0.9rem;
  margin-bottom: 1.2rem;

  .datepicker {
    display: flex;
    justify-content: space-between;
  }

  .check-in span,
  .check-out span,
  .period span {
    display: block;
    text-align: center;
    margin-bottom: 0.8rem;
  }

  .period .nights {
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
`

const DateForm = ({ startDate, endDate, nights, onChange }) => {
  return (
    <CustomDateForm>
      <div className="datepicker">
        <div className="check-in">
          <span>체크인</span>
          <DatePicker
            selectedDate={startDate}
            onChange={(e) => onChange('startDate', e)}
            minDate={moment().toDate()}
            />
        </div>
        <div className="check-out">
          <span>체크아웃</span>
          <DatePicker 
            selectedDate={endDate}
            onChange={(e) => onChange('endDate', e)}
            maxDate={moment().add('2', 'M').toDate()}
          />
        </div>
        <div className="period">
          <span>기간</span>
          <div className="nights">{nights}박 {nights + 1}일</div>
        </div>
      </div>
    </CustomDateForm>
  )   
}

export default DateForm;