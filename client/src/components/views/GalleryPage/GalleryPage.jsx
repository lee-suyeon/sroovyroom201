import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { PageContent, Button, TextLogo } from 'utils'

const FeedWrapper = styled.div`
  padding: 0.7rem;
  margin-bottom: 2rem;
`

const Feed = styled.div`
  padding: 0.5rem;
  padding-bottom: 0;
  border: 1px solid ${({ theme }) => theme.mainColor };
  margin-bottom: 2rem;

  & > img {
    display: block;
    width: 100%;
  }

  & p {
    font-size: 0.8rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.textColor };
  }

  &:last-child {
    margin-bottom: 3rem;
  }
`

const EndMessage = styled.div`
  color: ${({ theme }) => theme.textColor };
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.5;

  & .move-to-insta {
    margin-top: 1rem;
  }
`

const LOAD_COUNT = 6;

function GalleryPage() {
  const [ feeds, setFeeds ] = useState([]);
  const [ loadPost, setLoadPost ] = useState(LOAD_COUNT);

  useEffect(() => {
    getInstagramPost();
  }, [loadPost])

  const getInstagramPost = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_MEDIA_BASE_URL}me/media?fields=id,media_type,media_url,media_count,caption&limit=${loadPost}&access_token=${process.env.REACT_APP_INSTA_API_TOKEN}`)
        .then(res => setFeeds(res.data.data))
    } catch (err){
      console.log('error', err)
    }
  }

  const renderCaption = (caption) => {
    const captionStr = caption.split('\n');
    const dotIndex = captionStr.findIndex(c => c === '.');

    captionStr.splice(dotIndex, captionStr.length);

    let result = captionStr.map((line, idx) => 
      <p key={idx}> 
        {line}<br />
      </p>
    );
    
    return result;
  }

  const loadMorePost = () => {
    setLoadPost(prev => prev + LOAD_COUNT)
  }

  const galleryTitle = (
    <div>
      <TextLogo size="large"/>
      <p>랜선 집들이 🏡</p>
    </div>
  )
  
  return (
    <div style={{ padding: '2rem' }}>
      <PageContent 
        title={galleryTitle}
        desc="총 20개의 일상이 있습니다."
      />
      <FeedWrapper>
        {feeds && feeds.map((feed, idx) => (
          <Feed key={`feed${idx}`}>
            <img src={feed.media_url}/>
            <div style={{ padding: '0.7rem' }}>{renderCaption(feed.caption)}</div>
          </Feed>
      ))}
      </FeedWrapper>
      
      {/* {feeds.length === 0 && (
        <EndMessage>
          <p>
          오늘의 랜선 집들이는 <br/> 종료되었습니다 😔 <br />
          내일 다시 방문해주세요
          </p>
          <div className="move-to-insta">
            나는 못 기다리겠다. <br />
            여기 <Instagram />
          </div>
        </EndMessage> 
      )} */}
        <Button fullWidth onClick={loadMorePost}>
          일상 더 보기
        </Button>
    </div>
  )
}

export default withRouter(GalleryPage);
