import React  from 'react';
import styled from 'styled-components';

import { Modal } from 'utils';
import { visitTimeList } from './VisitTime';
import { dinnerMenuList } from './DinnerMenu';

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
    let result = checkIn;
    if(nights > 1) {
      result = `${checkIn} ~ ${checkOut} (${nights + 1}일)`;
    }

    return result;
  }

  let time = visitTimeList.map(list => {
    if(list.value === visitTime) return list.time;
  })

  let menu = dinnerMenuList.map(list => {
    if(list.value === dinnerMenu) return list.menu;
  })


  let content = (
    <BookingContent>
      <div><strong>{booker}</strong>님의 예약 정보를 확인할게요.</div>
      <div className="booking-info">
        <div>날짜 : <strong>{getVisitPeriod()}</strong></div>
        <div>방문시간 : <strong>{time}</strong></div>
        <div>인원수 : <strong>{`${headCount}명`}</strong></div>
        <div>메뉴 : <strong>{menu}</strong></div>
      </div>
      <div>
        💌 예약 내용은 이메일로 발송됩니다. <br />
        메일함을 확인해주세요. 
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