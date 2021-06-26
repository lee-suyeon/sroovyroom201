import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Axios from 'axios'

import PageContent from 'utils/PageContent'
import Nav from 'utils/Nav'
import Button from 'utils/Button'

import NoticeForm from './NoticeForm';

import { MessageSquare, X } from 'react-feather';
import moment from 'moment';

const NoticeWrapper = styled.div`

`

const NoticeBox = styled.div`
  display: flex;
  font-size: 0.9rem;
  margin-bottom: 2.5rem;
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

  & .notice-order {
    position: absolute;
    top: 5px; left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    font-size: 10px;
    color: #fff;
  }

  & .notice-box {
    width: 100%;
    position: relative;
    padding: 0.5rem 0;
  }

  & svg {
    color: ${({ theme }) => theme.mainColor };
    fill: ${({ theme }) => theme.mainColor };
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

const DeleteButton = styled.div`
  position: absolute;
  top: 0; 
  right: 0;

  & svg { width: 20px }
`

function NoticePage() {

  const userData = useSelector(state => state.user.userData);
  const isAdmin = userData && userData.isAdmin;
  
  const [ showNoticeForm, setShowNoticeForm ] = useState(false);
  const [ inputs, setInputs ] = useState({
    title: "",
    content: "",
  })
  const [ notices, setNotices ] = useState("");
  const { title, content } = inputs;

  useEffect(() => {
    getNoticesData();
  }, [notices])

  const getNoticesData = () => {
    Axios.post('/api/notice/notice')
      .then(res => {
        if(res.data.success){
          setNotices(res.data.notice.reverse())
        } else {
          alert('방명록을 불러오는 데 실패했습니다. ')
        }
      })
  }

	const onChangeHandler = (e) => {
		const { value, name } = e.target; 
		setInputs({
			...inputs,
			[name]: value
		});
	}

  const onClickWrite = () => {
    setShowNoticeForm(prev => !prev);
  }

  const onClickSubmit = () => {

    if(!title) return alert("제목을 입력해주세요.");
    if(!content) return alert("내용을 입력해주세요.");

    let body = {
      writer: userData && userData._id,
      title,
      content
    }

    Axios.post('/api/notice', body)
      .then(res => {
        if(res.data.success) {
          alert('공지사항 작성에 성공했습니다.')
          setShowNoticeForm(prev => !prev);
        } else {
          alert('공지사항 작성에 실패했습니다.')
        }
      })
  }

  const renderButton = () => {
    let button = <Button fullWidth onClick={onClickWrite}>WRITE</Button>

    if(showNoticeForm) { // 입력폼일 때 버튼
      button = <Button fullWidth onClick={onClickSubmit}>SUBMIT</Button>
    }

    return button;
  }

  const renderNotice = () => 
    notices && notices.map((notice, idx) => 
      <NoticeBox key={`notice${idx}`}>
        <div className="icon-box">
          <MessageSquare />
          <div className="notice-order">{idx + 1}</div>
        </div>
        <div className="notice-box">
          {/* <DeleteButton><X /></DeleteButton> */}
          <div className="title">{notice.title}</div>
          <div className="content">{notice.content}</div>
          <div className="date">{moment(notice.createAt).format("YY-MM-DD")}</div>
        </div>
      </NoticeBox>
    )

  return(
    <div>
      <div style={{ padding: '2rem' }}>
        <Nav />
        <PageContent 
          title="소식을 확인하세요."
          desc="📢 1건의 새로운 소식이 있습니다."
        />
        <NoticeWrapper>
          {showNoticeForm ?
            <NoticeForm 
              onChange={onChangeHandler}
              title={title}
              content={content}
            /> :
            renderNotice()
          }
        </NoticeWrapper>

      </div>
        {isAdmin && renderButton()}
    </div>
  )
}

export default NoticePage