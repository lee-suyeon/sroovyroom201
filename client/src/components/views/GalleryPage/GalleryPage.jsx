import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';

import { PageContent, Button, TextLogo } from 'utils'

const FeedWrapper = styled.div`
  padding: 0.7rem;
`

const Feed = styled.div`
  padding: 0.5rem 0.5rem 0;
  border: 1px solid ${({ theme }) => theme.mainColor };
  margin-bottom: 2.3rem;
  font-size: 0.75rem;
  text-align: center;

  & > img {
    display: block;
    width: 100%;
  }

  & p {
    line-height: 1.4;
    color: ${({ theme }) => theme.textColor };
  }

  &:last-child {
    margin-bottom: 3rem;
  }

  .timestamp {
    font-size: 0.7rem;
    margin-top: 0.5rem;
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
        .get(`${process.env.REACT_APP_MEDIA_BASE_URL}me/media?fields=id,media_type,media_url,media_count,caption,timestamp&limit=${loadPost}&access_token=${process.env.REACT_APP_INSTA_API_TOKEN}`)
        .then(res => setFeeds(res.data.data))
    } catch (err){
      console.log('error', err)
    }
  }

  const renderCaption = (caption) => {
    return renderHtml(captionFormat(caption));
  }

  const captionFormat = (caption) => {
    const captionStr = caption.split('\n');
    const dotIndex = captionStr.findIndex(c => c === '.');
    captionStr.splice(dotIndex, captionStr.length);

    return captionStr;
  }

  const renderHtml = (captionData) => {
    let result = captionData.map((data, idx) => 
      <p key={idx}> 
        {data}<br />
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
        desc="👍🏻 스루비룸 팔로우하기"
      />
      <FeedWrapper>
        {feeds && feeds.map((feed, idx) => (
          <Feed key={`feed${idx}`}>
            <img src={feed.media_url}/>
            <div className="timestamp">{moment(feed.timestamp).format("YYYY.MM.DD")}</div>
            <div style={{ padding: '0.7rem' }}>{renderCaption(feed.caption)}</div>
          </Feed>
      ))}
      </FeedWrapper>
      <Button fullWidth float onClick={loadMorePost}>
        일상 더 보기
      </Button>
    </div>
  )
}

export default withRouter(GalleryPage);
