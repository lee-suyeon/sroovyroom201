import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { normalize } from 'polished';

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

function Calendar ({ selectedDate, onChange, ...rest}) {

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
    />
  )
}

export default Calendar
