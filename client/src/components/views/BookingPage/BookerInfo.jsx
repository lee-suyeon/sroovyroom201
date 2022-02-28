import React  from 'react';
import styled from 'styled-components';

import { FormTitle } from './BookingPage';
import { TextInput } from 'utils';
import { Edit } from 'react-feather'; 

const BookerInfoForm = styled.div`
  label {
    width: 25%;
    margin-bottom: 0;
  } 

  input {
    width: 75%;
    border: 1px solid ${({ theme }) => theme.lightGreen };
    margin-bottom: 0;
    padding: 0.2rem 0.5rem;
  }

  input:focus {
    border: 1px solid ${({ theme }) => theme.mainColor };
  }

  .booker-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.7rem;
  }
`

function BookerInfo ({ booker, email, onChange }) {
  return (
    <BookerInfoForm>
      <FormTitle>
        <Edit />
        <div className="sub-title">예약자 정보를 입력해주세요.</div>
      </FormTitle>
      <TextInput 
        name="booker"
        label="예약자"
        required={true}
        className="booker-input"
        placeholder={"이름을 입력해주세요."}
        value={booker}
        onChange={(e) => onChange('booker', e.target.value)}
      />
      <TextInput 
        name="email"
        label="이메일"
        required={true}
        className="booker-input"
        placeholder={"이메일을 입력해주세요."}
        value={email}
        onChange={(e) => onChange('email',  e.target.value)}
      />
    </BookerInfoForm>
  )
}

export default BookerInfo;