import React  from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Check } from 'react-feather';

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

function BookingConfirmModal ({ bookingInfo, onToggle, onConfirm, successBooking }) {
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
        <div>방문시간 : <strong>{dinnerMenu}</strong></div>
        <div>인원수 : <strong>{`${headCount}명`}</strong></div>
        <div>메뉴 : <strong>{visitTime}</strong></div>
      </div>
      <div className="confirm">위의 내용으로 예약하실건가요? </div>
    </BookingContent>
  )

  let successMessage = (
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
      onConfirm={successBooking ? onToggle : onConfirm}
      type={successBooking ? "confirm" : ""}
      width={"70%"}
    >
      {successBooking ? successMessage : content}
  </Modal>
  )
}

export default BookingConfirmModal;