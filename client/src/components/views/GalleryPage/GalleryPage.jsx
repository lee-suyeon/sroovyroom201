import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import PageContent from 'utils/PageContent'
import Button from 'utils/Button'

import { API_TOKEN, API_URL, MEDIA_BASE_URL } from 'config'

const FeedWrapper = styled.div`
  margin-bottom: 2rem;
`

const Feed = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.mainColor };
  margin-bottom: 1rem;

  & > img {
    display: block;
    width: 100%;
    margin-bottom: 0.5rem;
  }

  & p {
    font-size: 0.85rem;
    line-height: 1.4;
    color: ${({ theme }) => theme.textColor };
  }
`


function GalleryPage(props) {

  const [ feeds, setFeeds ] = useState([]);

  // const tokenProp = useRef(token);
  // tokenProp.current = token;

  useEffect(() => {
    const abortController = new AbortController();

    getInstagramPost();
  }, [])

  const getInstagramPost = () => {
    try {
      axios
        .get(`${MEDIA_BASE_URL}me/media?fields=id,media_type,media_url,media_count,caption&limit=${6}&access_token=${API_TOKEN}`)
        .then(res => setFeeds(res.data.data))
    } catch (err){
      console.log('error', err)
    }
  }

  const renderCaption = (caption) => {

    const captionStr = caption.split('\n')
    const dotIndex = captionStr.findIndex(c => c === '.');
    
    captionStr.splice(dotIndex, captionStr.length);

    let result = captionStr.map(line => {
      return (
        <p>
          {line}
          <br />
        </p>
      )
    })

    return result;
  }

  console.log('feed', feeds)
  
  return (
    <div>
      <div style={{ padding: '2rem' }}>
        <PageContent 
          title="일상을 공유합니다."
          desc="총 20개의 일상이 있습니다."
        />
        <FeedWrapper>
          {feeds && feeds.map(feed => (
            <Feed>
              <img src={feed.media_url}/>
              <div style={{ padding: '0 0.5rem' }}>{renderCaption(feed.caption)}</div>
            </Feed>
        ))}

        <Button fullWidth>
          일상 더 보기
        </Button>

        </FeedWrapper>

          

      </div>
    </div>
  )
}

export default withRouter(GalleryPage);
