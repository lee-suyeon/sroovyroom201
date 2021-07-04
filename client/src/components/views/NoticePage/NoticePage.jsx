import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Axios from 'axios'

import PageContent from 'utils/PageContent'
import Nav from 'utils/Nav'
import Button from 'utils/Button'

import NoticeForm from './NoticeForm';

import { Hash, X, Delete, Edit, Trash2, Edit3 } from 'react-feather';
import moment from 'moment';

const NoticeWrapper = styled.div`

`

const NoticeBox = styled.div`
  display: flex;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  padding: 0 1rem;

  & .icon-box {
    margin-right: 1rem;
    position: relative;
  }

  & .icon-box::after {
    content: "";
    width: 1px;
    height: 85%;
    background-color: ${({ theme }) => theme.mainColor };
    position: absolute;
    top: 30px; 
    left: 50%;
    transform: translateX(-50%); 
  }

  & .notice-box {
    width: 100%;
    position: relative;
    padding: 0.3rem 0;
  }

  & svg {
    width: 21px;
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
    min-height: 50px;
  }

  & .date {
    color: ${({ theme }) => theme.lightGray};
    line-height: 1.2;
    text-align: right;
    font-size: 0.8rem;
  }
`

const DeleteButton = styled.div`
  position: absolute;
  top: 3px; 
  right: 0;

  & svg { 
    width: 18px;
    margin-right: 5px;
  }
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
  const [ showDeleteButton, setShowDeleteButton ] = useState(false);
  const [ selectedIndex, setSelectedIndex ] = useState("");
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

  const toggleDeleteButton = (idx) => {
    setSelectedIndex(idx)
    setShowDeleteButton(prev => !prev)
  }

  const onClickDelete = (idx) => {
    
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
          <Hash />
        </div>
        <div className="notice-box" onClick={() => toggleDeleteButton(idx)}>
          { 
            showDeleteButton && (selectedIndex === idx) &&
              <DeleteButton>
                <Edit3 />
                <Trash2 />
              </DeleteButton>
          }
          <div className="title">{notice.title}</div>
          <div className="content">{notice.content}</div>
          <div className="date">{moment(notice.createAt).format("YYYY-MM-DD")}</div>
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