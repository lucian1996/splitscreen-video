"use client"
import React from "react"
import {useVideoStore, Video} from "../utils/video-store"

export default function VideoPlayer() {
  const videoStore = useVideoStore()

  function generateIframeSrc(video: Video) {
    if (video && video.isRemote) {
      return getYoutubeVideo(video.path)
    } else if (video && video.file) {
      return URL.createObjectURL(video.file)
    }
    return ""
  }

  function getYoutubeVideo(url: string | undefined) {
    const regex = /[?&]v=([^&]+)/
    const videoId = url?.match(regex)
    if (videoId) {
      return "https://www.youtube.com/embed/" + videoId[1]
    } else {
      return ""
    }
  }

  const splitScreen = (videosArray: Video[]) => {
    const columns = Math.ceil(Math.sqrt(videosArray.length))
    return (
      <div className='w-full h-full absolute flex flex-wrap'>
        {videosArray.map((video: Video, index: number) => (
          <div
            key={index}
            className='relative flex-1'
            style={{flexBasis: `calc(${100 / columns}%)`}}
          >
            <iframe
              src={generateIframeSrc(video)}
              title={`Video Player ${index}`}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              className='w-full h-full'
            ></iframe>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='w-full h-full absolute'>
      {splitScreen(videoStore.videos)}
    </div>
  )
}