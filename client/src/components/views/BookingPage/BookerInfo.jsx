import React, { useState }  from 'react';
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

  .invalid {
    color: ${({ theme }) => theme.pink };
    text-align: center;
    margin-top: -0.2rem;
  }
`
const emailValidation = (email) => {
  let reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return reg.test(email);
}

function BookerInfo ({ booker, email, onChange }) {
  const [ emailVaidate, setEmailVaidate ] = useState(true);

  const onChangeEmail = (e) => {
    if(!emailValidation(e.target.value) ) {
      setEmailVaidate(false);
    } else {
      setEmailVaidate(true);
    }
    onChange('email', e.target.value);
  }

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
        maxLength={20}
        value={booker}
        onChange={(e) => onChange('booker', e.target.value)}
      />
      <TextInput 
        name="email"
        label="이메일"
        required={true}
        className="booker-input"
        placeholder={"이메일을 입력해주세요."}
        maxLength={50}
        value={email}
        onChange={onChangeEmail}
      />
      {!emailVaidate &&
        <div className="invalid">❗️이메일 형식으로 적어주세요.❗️</div>
      }
    </BookerInfoForm>
  )
}

export default BookerInfo;