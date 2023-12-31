import React from 'react'

const VideoCard = ({info}) => {
    const {snippet, statistics} = info;
    const {channelTitle, title, thumbnails} = snippet;

  return (
    <div className="p-2 m-2 w-52 shadow-lg">
        <img className="rounded-lg" alt="video" src={thumbnails.medium.url} />
        <ul>
            <li className="font-bold py-2">{title}</li>
            <li>{channelTitle}</li>
            <li>{statistics.viewCount}</li>
        </ul>
    </div>
  )
}

//Higher Order Component
export const AdVideoCard = ({info}) => {
  return(
    <div className="p-1 m-1 border border-red-900">
      <VideoCard info={info} />
      <p className="px-2 text-left font-bold">Ad</p>
    </div>
  )
}

export default VideoCard;