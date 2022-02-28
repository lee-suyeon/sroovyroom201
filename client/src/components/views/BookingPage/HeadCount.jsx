import React  from 'react';
import styled from 'styled-components';

import { FormTitle } from './BookingPage';
import { Users } from 'react-feather'; 


const headCountList = [
  { value: 1, desc: "혼자 갈게요.", emoji: "🧍🏻", emoji2: "🕺🏻"},
  { value: 2, desc: "둘이 갈게요.", emoji: "🧍🏻🧍🏻", emoji2: "🕺🏻🕺🏻"},
  { value: 3, desc: "셋이 갈게요.", emoji: "🧍🏻🧍🏻🧍🏻", emoji2: "🕺🏻🕺🏻🕺🏻"},
]

const HeadCountForm = styled.div`
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
    background-color: ${({ theme }) => theme.lightGreen };
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

function HeadCount ({ headCount, onClick }) {
  return (
    <HeadCountForm>
      <FormTitle>
        <Users />
        <span className="sub-title">몇 명이서 오시나요?</span>
      </FormTitle>
      <div className="select-head">
        {headCountList.map((head, idx) => 
          <button 
            key={`head${idx}`}
            onClick={() => onClick('headCount', head.value)}
            value={headCount}
            className={ headCount == head.value ? 'selected' : "" }
          >
            <span>{ headCount == head.value ? head.emoji2 : head.emoji }</span>
            <p>{head.desc}</p>
          </button> 
        )}
      </div>
    </HeadCountForm>
  )
}

export default HeadCount;