import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { normalize } from 'polished';

const DateSelectButton = styled.button`
  width: 90px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.mainColor };
  color: ${({ theme }) => theme.textColor };
  font-size: 0.9rem;
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
    dateFormat="yyyy-MM-dd"
      selected={selectedDate}
      onChange={onChange}
      customInput={<DatePickerInput/>}
    />
  )
}

export default Calendar
