import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Axios from "axios";
import moment from "moment";

import { PageContent, Button, TextLogo } from "utils";
import NoticeForm from "./NoticeForm";
import { Hash, Trash2, Edit3 } from "react-feather";
import { toast } from "react-toastify";

const NoticeWrapper = styled.div``;

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
    background-color: ${({ theme }) => theme.mainColor};
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
    color: ${({ theme }) => theme.mainColor};
  }

  & .title {
    color: ${({ theme }) => theme.mainColor};
    font-weight: bold;
    margin-bottom: 1rem;
  }

  & .content {
    color: ${({ theme }) => theme.textColor};
    line-height: 1.3;
    min-height: 50px;
    white-space: pre-line;
    font-size: 0.85rem;
  }

  & .date {
    color: ${({ theme }) => theme.lightGray};
    line-height: 1.2;
    text-align: right;
    font-size: 0.8rem;
    margin-top: 1rem;
  }
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 3px;
  right: 0;

  & svg {
    width: 18px;
    margin-right: 5px;
  }
`;

function NoticePage() {
  const userData = useSelector((state) => state.user.userData);
  const isAdmin = userData && userData.isAdmin;

  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });
  const [notices, setNotices] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState("");
  const { title, content } = inputs;

  useEffect(() => {
    getNoticesData();
  }, []);

  const getNoticesData = () => {
    Axios.post("/api/notice/notice").then((res) => {
      if (res.data.success) {
        setNotices(res.data.notice.reverse());
      } else {
        toast.error("공지사항을 불러오는데에 실패했습니다. ");
      }
    });
  };

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onClickWrite = () => {
    setShowNoticeForm((prev) => !prev);
  };

  const toggleDeleteButton = (idx) => {
    setSelectedIndex(idx);
    setShowDeleteButton((prev) => !prev);
  };

  const onClickSubmit = () => {
    if (!title) return toast.error("제목을 입력해주세요.");
    if (!content) return toast.error("내용을 입력해주세요.");

    let body = {
      writer: userData && userData._id,
      title,
      content,
    };

    Axios.post("/api/notice", body).then((res) => {
      if (res.data.success) {
        toast.success("공지사항 작성에 성공했습니다.");
        setShowNoticeForm((prev) => !prev);
      } else {
        toast.error("공지사항 작성에 실패했습니다.");
      }
    });
  };

  const renderButton = () => {
    let button = (
      <Button fullWidth float onClick={onClickWrite}>
        WRITE
      </Button>
    );

    if (showNoticeForm) {
      // 입력폼일 때 버튼
      button = (
        <Button fullWidth onClick={onClickSubmit}>
          SUBMIT
        </Button>
      );
    }

    return button;
  };

  const renderNotice = () =>
    notices &&
    notices.map((notice, idx) => (
      <NoticeBox key={`notice${idx}`}>
        <div className="icon-box">
          <Hash />
        </div>
        <div className="notice-box" onClick={() => toggleDeleteButton(idx)}>
          {showDeleteButton && selectedIndex === idx && (
            <DeleteButton>
              <Edit3 />
              <Trash2 />
            </DeleteButton>
          )}
          <div className="title">{notice.title}</div>
          <div className="content">{notice.content}</div>
          <div className="date">
            {moment(notice.createdAt).format("YYYY-MM-DD")}
          </div>
        </div>
      </NoticeBox>
    ));

  const noticeTitle = (
    <React.Fragment>
      <TextLogo size="large" />의<p>소식을 확인하세요 📢</p>
    </React.Fragment>
  );

  return (
    <div style={{ height: "100vh" }}>
      <div style={{ padding: "2rem" }}>
        <PageContent
          title={noticeTitle}
          desc={`📮 ${notices.length}건의 새로운 소식이 있습니다.`}
        />
        <NoticeWrapper>
          {showNoticeForm ? (
            <NoticeForm
              onChange={onChangeHandler}
              title={title}
              content={content}
            />
          ) : (
            renderNotice()
          )}
        </NoticeWrapper>
      </div>
      {isAdmin && renderButton()}
    </div>
  );
}

export default NoticePage;
