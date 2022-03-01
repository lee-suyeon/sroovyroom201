import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelectButton = styled.button`
  width: 90px;
  height: 30px;
  border: none;
  color: ${({ theme }) => theme.mainColor };
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0.2rem;
  font-family: 'Montserrat', sans-serif;
`

const CalendarContainer = styled.div`
  position: relative
  border-radius: 0;
  border: none;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.3);

  .react-datepicker__header {
    border-radius: 0;
    background: ${({ theme }) => theme.mainColor };
    padding: 10px 0 5px;
  }
  
  .react-datepicker__current-month {
    color: ${({ theme }) => theme.white };
    margin-bottom: 0.3rem;
  }

  .react-datepicker__day-name {
    color: ${({ theme }) => theme.white };
    font-weight: 500;
  }

  .react-datepicker__navigation-icon::before {
    border-color: ${({ theme }) => theme.white };
  }

  .react-datepicker__navigation {
    top: 12px;
    width: 36px;
    height: 36px;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: ${({ theme }) => theme.mainColor };
  }
`;

const CustomContainer = ({ className, children }) => {
  return (
    <CalendarContainer className={className}>
      <div style={{ position: "relative" }}>{children}</div>
    </CalendarContainer>
  );
};

function Calendar ({ selectedDate, onChange, maxDate, minDate, excludeDates, ...rest}) {

  const DatePickerInput = forwardRef(({ value, onClick }, ref) => (
    <DateSelectButton className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </DateSelectButton>
  ));

  return (
    <DatePicker
      dateFormat="MM월 dd일"
      selected={selectedDate}
      onChange={onChange}
      customInput={<DatePickerInput/>}
      maxDate={maxDate}
      minDate={minDate}
      calendarContainer={CustomContainer}
      excludeDates={excludeDates}
      popperPlacement="bottom-start"
    />
  )
}

export default Calendar
