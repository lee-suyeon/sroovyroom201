import React from 'react';
import styled from 'styled-components';

import { default as DatePicker }  from 'utils/Calendar';
import { Calendar } from 'react-feather';

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

const DateForm = ({ startDate, endDate, nights, onChange }) => {
  return (
    <CustomDateForm>
      <FormTitle>
        <Calendar />
        <div className="sub-title">방문날짜를 선택해주세요.</div>
        {/* <CheckBox 
          id="overnight"
          name="자고 갈거에요"
          /> */}
      </FormTitle>
      <div className="datepicker">
        <div className="check-in">
          <span>체크인</span>
          <DatePicker
            selectedDate={startDate}
            onChange={(e) => onChange('startDate', e)}
            />
        </div>
        <div className="check-out">
          <span>체크아웃</span>
          <DatePicker 
            selectedDate={endDate}
            onChange={(e) => onChange('endDate', e)}
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