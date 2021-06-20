import React from 'react'
import styled from 'styled-components'

import PageContent from 'utils/PageContent'
import { Hash } from 'react-feather'

const NoticeWrapper = styled.div`
  display: flex;
  font-size: 0.9rem;
  margin-bottom: 3rem;
  padding: 0 1rem;

  & .icon-box {
    // border : 1px solid ${({ theme }) => theme.mainColor }; 
    margin-right: 1rem;
    position: relative;
  }

  & .icon-box::after {
    content: "";
    width: 1px;
    height: 100%;
    background-color: ${({ theme }) => theme.mainColor };
    position: absolute;
    top: 30px; 
    left: 50%;
    transform: translateX(-50%); 
  }

  & svg {
    color: ${({ theme }) => theme.mainColor };
  }

  & .title {
    color: ${({ theme }) => theme.mainColor };
    font-weight: bold;
    margin-bottom: 1rem;
  }

  & .content {
    color: ${({ theme }) => theme.textColor };
    line-height: 1.2;
  }

  & .date {
    color: ${({ theme }) => theme.light };
    line-height: 1.2;
  }
`

function NoticePage() {
  return(
    <div>
      <div style={{ padding: '2rem' }}>
        <PageContent 
          title="소식을 확인하세요."
          desc="📢 1건의 새로운 소식이 있습니다."
        />

      <NoticeWrapper>
        <div className="icon-box">
          <Hash />
        </div>
        <div className="notice-box">
          <div className="title">6월 공지사항</div>
          <div className="content">공지사항내용공지사항내용공지사항내용공지사항내용공지사항내용공지사항내용</div>
          <div className="date">21.06.24</div>
        </div>
      </NoticeWrapper>
      <NoticeWrapper>
        <div className="icon-box">
          <Hash />
        </div>
        <div className="notice-box">
          <div className="title">6월 공지사항</div>
          <div className="content">공지사항내용공지사항내용공지사항내용공지사항내용공지사항내용공지사항내용</div>
          <div className="date">21.06.24</div>
        </div>
      </NoticeWrapper>

      </div>
    </div>
  )
}

export default NoticePage