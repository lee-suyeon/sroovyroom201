import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "_actions/user_action";
import styled from "styled-components";

import SideNav from "components/views/SideNav/SideNav";
import { Button, TextInput, TextLogo, SelectBox, PageContent } from "utils";
import { mbtiList, avatarList } from "./selectList";
import { toast } from "react-toastify";

const ContentPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

const FreeDrink = styled.div`
  font-size: 0.8rem;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 0 1rem 3rem;
`;
const AvatarSelect = styled.div`
  margin-bottom: 2rem;

  .title {
    color: ${({ theme }) => theme.mainColor};
    font-weight: 500;
    margin-bottom: 1rem;
  }

  p {
    font-size: 0.825rem;
    color: #666;
    margin-bottom: 1rem;
  }

  .avatar {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .preview {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${({ theme }) => theme.lightGreen};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 23px;
  }

  .preview > span {
    margin-bottom: 0.2rem;
    margin-left: 0.1rem;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    font-size: 23px;
    grid-gap: 0.7rem;
  }
`;

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
  });
  const [mbti, setMbti] = useState(-1);
  const [avatar, setAvatar] = useState(0);
  const { name, email, password, message } = inputs;

  const onChangeInput = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onChangeSelect = (e) => {
    setMbti(e.target.value);
  };

  const onChangeAvatart = (idx) => {
    setAvatar(idx);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      email,
      name,
      password,
      avatar,
      mbti,
      message,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        toast.success("이제부터 sroovyroom과 칭긔칭긔~🥳");
        props.history.push("/login");
      } else {
        toast.error("sroovyroom과 친구되기 실패!😓");
      }
    });
  };

  const renderAvatar = () => {
    let findEmoji = avatarList.find((list) => list.idx === avatar);
    return findEmoji && findEmoji.emoji;
  };

  const registerTitle = (
    <React.Fragment>
      <TextLogo size="large" />과<p>친구되기 👫🏻</p>
    </React.Fragment>
  );

  const freeDrink = (
    <FreeDrink>
      <TextLogo size="small" color="text" />과 친구하면 웰컴 드링크🍹를 드려요!
    </FreeDrink>
  );

  const toMessage = (
    <React.Fragment>
      To. <TextLogo size="medium" />
    </React.Fragment>
  );

  return (
    <ContentPage>
      <PageContent title={registerTitle} desc={freeDrink} />

      <InputForm onSubmit={onSubmitHandler}>
        <TextInput
          label="E-mail"
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={onChangeInput}
        />
        <TextInput
          label="Name"
          type="text"
          name="name"
          placeholder="이름 또는 별명을 알려주세요."
          value={name}
          onChange={onChangeInput}
        />
        <TextInput
          label="Password"
          type="password"
          name="password"
          placeholder="나만 아는 비밀번호로 입력해주세요."
          value={password}
          onChange={onChangeInput}
        />
        <AvatarSelect>
          <div className="title">Avatar</div>
          <p> 본인에게 가장 어울리는 아바타를 선택해주세요.</p>
          <div className="avatar">
            <div className="preview">
              <span>{renderAvatar()}</span>
            </div>
            <ul>
              {avatarList.map((list, idx) => (
                <li
                  key={`avatar${idx}`}
                  onClick={() => onChangeAvatart(list.idx)}
                >
                  {list.emoji}
                </li>
              ))}
            </ul>
          </div>
        </AvatarSelect>
        <SelectBox
          label="MBTI"
          datas={mbtiList}
          value={mbti}
          onChange={onChangeSelect}
          placeholder="나의 MBTI를 알려주세요."
          showPlaceholder={true}
        />
        <TextInput
          label={toMessage}
          name="message"
          type="text"
          placeholder="하고싶은 말을 적어주세요. 없으면 서운해요.😢"
          value={message}
          onChange={onChangeInput}
        />
        <Button fullWidth float size="medium">
          OK
        </Button>
      </InputForm>
    </ContentPage>
  );
}

export default withRouter(RegisterPage);
