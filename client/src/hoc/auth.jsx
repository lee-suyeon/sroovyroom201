import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { auth } from '../_actions/user_action';

// null => 아무나 접속이 가능한 페이지
// true => 로그인한 유저만 접속이 가능한 페이지
// false => 로그인한 유저는 접속이 불가능한 페이지 (register, login..)

export default function (SpecificComponent, option, adminRoute = null){

  function AuthenticationCheck(props) {

    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(auth()).then(res => {
        if(!res.payload.isAuth){ // 로그인X
          if(option){
            props.history.push('/login');
          }
        } else { // 로그인 O
          if(adminRoute && !res.payload.isAdmin){
            props.history.push('/');
          } else {
            if(option === false){
              props.history.push('/');
            }
          }
        }
      })
    }, [])

    return (
      <SpecificComponent />
    )
  }

  return AuthenticationCheck;
}