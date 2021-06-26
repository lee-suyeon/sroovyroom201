import React, { useState } from 'react'

import TextInput from 'utils/TextInput'
import { TextArea } from 'utils/TextInput'

function NoticeForm({ onChange, title, content }) {
  return(
    <div>
      <TextInput 
        type="text"
        label="Title"
        name="title"
        placeholder="제목"
        value={title}
        onChange={onChange}
      />
      <TextArea 
        label="Content"
        name="content"
        placeholder="내용을 입력해주세요."
        value={content}
        onChange={onChange}
      />
    </div>
  )


}

export default NoticeForm