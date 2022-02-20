import React  from 'react';
import styled from 'styled-components';

import { Modal } from 'utils';

function BookingConfirmModal ({ onToggle }) {
  return (
    <Modal onClose={onToggle}><Content /></Modal>
  )
}

const BookingContent = styled.div`
  text-align: left;
  font-size: 0.9rem;

  strong {
    font-weight: 500;
    color: ${({ theme }) => theme.mainColor };
  }

  & > div {
    margin-bottom: 1rem;
  }

  .confirm {
    text-align: center;
    margin-bottom: 0;
  }
`

export const Content = () => {
  return (
    <BookingContent>
      <div><strong>guest</strong>님의 예약 정보를 확인할게요.</div>
      <div className="booking-info">
        <div>날짜 : <strong>02월 12일 ( 1일 )</strong></div>
        <div>방문시간 : <strong>17: 00</strong></div>
        <div>인원수 : <strong>1명</strong></div>
        <div>메뉴 : <strong>스루비의 요리조리</strong></div>
      </div>
      <div>
        💌 예약 내용은 이메일로 발송됩니다. <br />
        메일함을 확인해주세요. 
      </div>
      <div className="confirm">위의 내용으로 예약하실건가요? </div>
    </BookingContent>
  )
}

export default BookingConfirmModal;