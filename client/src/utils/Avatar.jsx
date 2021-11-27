import React from 'react';
import styled from 'styled-components';

const avatarList = [
  { idx: 0, emoji: "👩🏻"},
  { idx: 1, emoji: "🧔🏻"},
  { idx: 2, emoji: "🧑🏻‍🦰"},
  { idx: 3, emoji: "👱🏻‍♀️"},
  { idx: 4, emoji: "👱🏻"},
  { idx: 5, emoji: "🧑🏻‍🦲"},
  { idx: 6, emoji: "🧛🏻"},
  { idx: 7, emoji: "🧚🏻‍♀️"},
  { idx: 8, emoji: "🧞‍♂️"},
  { idx: 9, emoji: "🧝🏻‍♀️"},
]

function Avatar({ avatar, ...rest}) {
  const findEmoji = avatarList.find(a => a.idx === avatar);

  return (
    <div>{avatar ? findEmoji.emoji : "👻"}</div>
  )
}

export default Avatar
