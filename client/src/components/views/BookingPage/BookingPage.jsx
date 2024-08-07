import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import SideNav from "components/views/SideNav/SideNav";
import { PageContent, TextLogo, Button } from "utils";
import { toast } from "react-toastify";

import Axios from "axios";
import moment from "moment";

import VisitDate from "./VisitDate";
import HeadCount from "./HeadCount";
import VisitTime, { visitTimeList } from "./VisitTime";
import DinnerMenu, { dinnerMenuList } from "./DinnerMenu";
import BookerInfo from "./BookerInfo";
import InfoAgreement from "./InfoAgreement";
import BookingConfirmModal from "./BookingConfirmModal";
import BookingSuccessModal from "./BookingSuccessModal";

const ContentPage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 2rem;
`;

const BookingForm = styled.div`
  padding: 0 0.5rem;

  & > div {
    margin-bottom: 2rem;
  }

  & > div:last-child {
    margin-bottom: 5rem;
  }
`;

export const FormTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  .sub-title {
    color: ${({ theme }) => theme.textColor};
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 0.1rem;
  }

  & svg {
    width: 18px;
    margin-right: 0.3rem;
    color: ${({ theme }) => theme.textColor};
  }
`;

function BookingPage(props) {
  const userData = useSelector((state) => state.user.userData);
  const [bookingInfo, setBookingInfo] = useState({
    checkIn: new Date(),
    checkOut: new Date(),
    nights: 0,
    headCount: 1,
    visitTime: 1,
    dinnerMenu: 1,
    booker: userData?.isAuth ? userData.name : "",
    email: userData?.isAuth ? userData.email : "",
    infoAgreement: false,
  });
  const {
    checkIn,
    checkOut,
    nights,
    headCount,
    visitTime,
    dinnerMenu,
    booker,
    email,
    infoAgreement,
  } = bookingInfo;
  const [confirmModal, setConfirmModal] = useState(false);
  const [validate, setValidate] = useState(false);
  const [bookingList, setBookingList] = useState([]);
  const [successBooking, setSuccessBooking] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  useEffect(() => {
    setBookingInfo({
      ...bookingInfo,
      nights: moment(checkOut).diff(moment(checkIn), "days"),
    });
  }, [checkIn, checkOut, nights]);

  useEffect(() => {
    if (nights < 0 || !booker || !email || !infoAgreement) {
      setValidate(true);
    } else {
      setValidate(false);
    }
  }, [booker, email, infoAgreement, validate, nights]);

  useEffect(() => {
    Axios.get("/api/booking/date").then((res) => {
      if (res.data.success) {
        setBookingList(res.data.date);
      } else {
        toast.error("예약 정보를 가져오지못했습니다.");
      }
    });
  }, []);

  const handleBookingInfoChange = useCallback(
    (field, value) => {
      if (field === "infoAgreement") value = !value;

      setBookingInfo({
        ...bookingInfo,
        [field]: value,
      });
    },
    [
      checkIn,
      checkOut,
      nights,
      headCount,
      visitTime,
      dinnerMenu,
      booker,
      email,
      infoAgreement,
      validate,
    ]
  );

  const handleConfirmModalToggle = useCallback(() => {
    setConfirmModal((prev) => !prev);
  }, [confirmModal]);

  const handleSuccessModalToggle = useCallback(() => {
    setSuccessModal((prev) => !prev);
    props.history.push("/menu");
  }, [successModal]);

  const createBookingData = () => {
    let result = {
      user: userData._id,
      booker,
      email,
      checkIn,
      checkOut,
      nights,
      visitTime: visitTimeList.find((list) => list.value === visitTime).time,
      headCount,
      dinnerMenu: dinnerMenuList.find((list) => list.value === dinnerMenu).menu,
      infoAgreement,
    };
    return result;
  };

  const confirmBooking = () => {
    booking();
    sendMail();
  };

  const booking = () => {
    Axios.post("/api/booking", createBookingData()).then((res) => {
      if (res.data.success) {
        setSuccessBooking(true);
        handleConfirmModalToggle();
        setSuccessModal((prev) => !prev);
      } else {
        toast.error("예약 실패했습니다.");
      }
    });
  };

  const sendMail = () => {
    Axios.post("/api/booking/sendMail", createBookingData()).then((res) => {
      if (res.data.success) {
        toast.success("메일이 전송되었습니다.");
      } else {
        toast.erro("메일 전송에 실패했습니다.");
      }
    });
  };

  const BookingTitle = (
    <div>
      <TextLogo size="large" />
      <p>예약하기</p>
    </div>
  );

  return (
    <ContentPage>
      <PageContent title={BookingTitle} desc="📒 방문전에 예약해주세요." />
      <BookingForm>
        {/* 방문날짜 */}
        <VisitDate
          checkIn={checkIn}
          checkOut={checkOut}
          nights={nights}
          bookingList={bookingList}
          onChange={handleBookingInfoChange}
        />

        {/* 방문시간 */}
        <VisitTime visitTime={visitTime} onClick={handleBookingInfoChange} />

        {/* 인원수 */}
        <HeadCount headCount={headCount} onClick={handleBookingInfoChange} />

        {/* 메뉴 */}
        <DinnerMenu
          dinnerMenu={dinnerMenu}
          onChange={handleBookingInfoChange}
        />

        {/* 예약자 정보 */}
        <BookerInfo
          booker={booker}
          email={email}
          onChange={handleBookingInfoChange}
        />

        {/* 개인정보동의 */}
        <InfoAgreement
          infoAgreement={infoAgreement}
          onChange={handleBookingInfoChange}
        />
      </BookingForm>

      <Button
        fullWidth={true}
        float={true}
        disabled={validate}
        onClick={handleConfirmModalToggle}
      >
        예약하기
      </Button>

      {confirmModal && (
        <BookingConfirmModal
          bookingInfo={createBookingData()}
          onToggle={handleConfirmModalToggle}
          onConfirm={confirmBooking}
        />
      )}

      {successBooking && successModal && (
        <BookingSuccessModal onToggle={handleSuccessModalToggle} />
      )}
    </ContentPage>
  );
}

export default BookingPage;
