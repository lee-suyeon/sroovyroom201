import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from 'utils/Button';
import CheckBox from 'utils/CheckBox';
import PageContent from 'utils/PageContent';
import SelectBox from 'utils/SelectBox';
import { default as DatePicker }  from 'utils/Calendar';

import { Calendar, Users, Clipboard } from 'react-feather';

const ReservationForm = styled.div`
  padding: 0 0.5rem;
`

const DateForm = styled.div`
  font-size: 0.9rem;
  margin-bottom: 1.2rem;

  & > .datepicker {
    display: flex;
    justify-content: space-between;

    & span {
      margin-right: 0.3rem;
    }
  }
`

const FormTitle = styled.div`
  display: flex;
  color: ${({ theme }) => theme.mainColor };
  align-items: center;
  font-weight: 500;
  font-size: 1.1rem;
  margin-bottom: 0.8rem;

  & svg {
    width: 20px;
    margin-right: 0.3rem;
  }
`

const HeadCount = styled.div`
  display: flex;
  justify-content: space-between;
`

const Menu = styled.div`

`

const headCountList = [
  { idx: 0, name: "1명"},
  { idx: 1, name: "2명"},
  { idx: 2, name: "3명"},
]

function ReservationPage(props) {
  const [ startDate, setStartDate ] = useState(new Date());
  const [ endDate, setEndDate ] = useState(new Date());
  const [ headCount, setHeadCount ] = useState(-1)

  const startDateChangeHandler = (e) => {
    setStartDate(e.target.value);
  }

  const endDateChangeHandler = (e) => {
    setEndDate(e.target.value);
  }

  const headCountChangeHandler = (e) => {
    console.log(e.target.value)
    setHeadCount(e.target.value)
  }

  return(
    <div className="reservation-page">
      <div style={{ padding: "2rem"}}>
        <PageContent 
          title="예약하기"
          desc="방문전에 예약해주세요."
        />
        <ReservationForm>
          <DateForm>
            <FormTitle>
              <Calendar />
              <div>날짜</div>
            </FormTitle>
            <CheckBox
              id="oneday" 
              name="집에 갈거에요"
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <CheckBox 
                id="overnight"
                name="자고 갈거에요"
                />
              <span>1박</span>
            </div>
            <div className="datepicker">
              <div>
                <span>체크인</span>
                <DatePicker
                  selectedDate={startDate}
                  onChange={startDateChangeHandler}
                  />
              </div>
              <div>
                <span>체크아웃</span>
                <DatePicker 
                  selectedDate={endDate}
                  onChange={endDateChangeHandler}
                />
              </div>
            </div>
          </DateForm>
          {/* 인원수 */}
          <HeadCount>
            <FormTitle>
              <Users />
              <span>인원수</span>
            </FormTitle>
              <SelectBox
                datas={headCountList}
                onChange={headCountChangeHandler}
                value={headCount}
                size={50}
                style={{ height: '30px', padding: '0.3rem 0.5rem'}}
              />
          </HeadCount>

          {/* 메뉴 */}
          <Menu>
            <FormTitle>
              <Clipboard />
              <span>메뉴</span>
            </FormTitle>
            {/* <span>Sukiyaki</span>
            <span>스루비정식</span>
            <span>eatout</span> */}
          </Menu>
        </ReservationForm>
      </div>
    </div>
  )
}

export default ReservationPage;

