import React  from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Modal } from 'utils';

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

function BookingConfirmModal ({ bookingInfo, onToggle, onConfirm }) {
  const { booker, checkIn, checkOut, nights, visitTime, headCount, dinnerMenu } = bookingInfo;

  const getVisitPeriod = () => {
    let result = moment(checkIn).format("YYYY-MM-DD");
    if(nights > 1) {
      result = `${moment(checkIn).format("YYYY-MM-DD")} ~ ${moment(checkOut).format("YYYY-MM-DD")} (${nights + 1}일)`;
    }

    return result;
  }

  let content = (
    <BookingContent>
      <div><strong>{booker}</strong>님의 예약 정보를 확인할게요.</div>
      <div className="booking-info">
        <div>날짜 : <strong>{getVisitPeriod()}</strong></div>
        <div>방문시간 : <strong>{visitTime}</strong></div>
        <div>인원수 : <strong>{`${headCount}명`}</strong></div>
        <div>메뉴 : <strong>{dinnerMenu}</strong></div>
      </div>
      <div className="confirm">위의 내용으로 예약하실건가요? </div>
    </BookingContent>
  )

  return (
    <Modal 
      onClose={onToggle}
      onConfirm={onConfirm}
      width={"70%"}
    >
      {content}
  </Modal>
  )
}

export default BookingConfirmModal;