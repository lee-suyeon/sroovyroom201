import React  from 'react';
import styled from 'styled-components';

import { FormTitle } from './ReservationPage';
import { Clock } from 'react-feather'; 

const visitTimeList = [
  { value: 1, time: "17:00" },
  { value: 2, time: "18:00" },
  { value: 3, time: "19:00" },
  { value: 4, time: "20:00" },
]

const VisitTimeForm = styled.div`
  .time-buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 0.3rem;
    color: ${({ theme }) => theme.mainColor };
  }
  
  button {
    font-family: 'Montserrat', sans-serif;
    border: 1px solid ${({ theme }) => theme.mainColor };
    font-size: 1.1rem;
    font-weight: 500;
    color: #779482;
    padding: 0.4rem;
  }

  button.selected {
    background: ${({ theme }) => theme.mainColor };
    color: ${({ theme }) => theme.white }
  }
`

function VisitTime ({ visitTime, onClick }) {
  return (
    <VisitTimeForm>
      <FormTitle>
        <Clock />
        <div className="sub-title">방문시간을 선택해주세요.</div>
      </FormTitle>
      <div className="time-buttons">
        {visitTimeList.map((list, i) => 
          <button 
            key={`time${list.value}`}
            onClick={() => onClick(list.value)}
            className={ visitTime == list.value && 'selected' }
          >
            {list.time}
          </button>
        )}
      </div>
    </VisitTimeForm>
  )
}

export default VisitTime;