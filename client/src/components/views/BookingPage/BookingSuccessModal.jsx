import React  from 'react';
import styled from 'styled-components';

import { Check } from 'react-feather';
import { Modal } from 'utils';

const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  .check {
    width: 60px;
    height: 60px;
    background: ${({ theme }) => theme.mainColor };
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }

  svg {
    width: 40px;
    height: 40px;
    color: ${({ theme }) => theme.white };
  }

  p {
    margin-bottom: 0.5rem;
  }
`

function BookingSuccessModal ({ onToggle }) {
  let content = (
    <SuccessMessage>
      <div className="check">
        <Check />
      </div>
      <div>예약 완료 👌🏻</div>
      <p>
        예약 내용은 이메일로 발송됩니다. <br />
        💌 메일함을 확인해주세요. 
      </p>
    </SuccessMessage>
  )

  return (
    <Modal 
      onClose={onToggle}
      onConfirm={onToggle}
      type="confirm"
      width={"70%"}
    >
      {content}
  </Modal>
  )
}

export default BookingSuccessModal;