import { useState, useEffect } from "react";
import Image from 'next/image'
import ReactPlayer from "react-player";
import leftArrowBird from '../../public/left-arrow-bird.png'
import rightArrowFlower from '../../public/right-arrow-flower.png'
import eye from '../../public/eye.png'

const videoUrls = [
  '../../test.webm',
  // 'https://youtu.be/8aTC3pbooKM',
  // 'https://youtu.be/Ba0-_qvHzsM',
  // 'https://youtu.be/xm_bch6Yj60',
  // 'https://youtu.be/ZyApBa2zp3U',
  // 'https://youtu.be/L0zlFvFQvXo',
  // 'https://youtu.be/5Y4o1boFNmg',
  // 'https://youtu.be/OfCTG6ublDo',
  // 'https://youtu.be/54DLyvf-72g',
  // 'https://youtu.be/s4F_IceGcZg',
  // // ' https://youtu.be/as127zNyQ6k',
  // 'https://www.youtube.com/embed/as127zNyQ6k'

]

const WIDTH = 900;
const HEIGHT = WIDTH * 480 / 960;

const arrowWidth = 200;

const beginButtonWidth = 400;
const beginButtonHeight = 1394 / 1517 * beginButtonWidth;


const App = () => {

  const [hasBegun, setHasBegun] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentBufferingVideo, setCurrentBufferingVideo] = useState(0);
  const [isBuffering, setIsBuffering] = useState(true);
  const [videoOpacities, setVideoOpacities] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  // console.log('videoOpacities :>> ', videoOpacities);

  // useEffect(() => {

  // }, [])

  // useEffect(() => {
  //   if (currentBufferingVideo === currentVideo) {
  //     setIsBuffering(false);
  //   }
  // }, [currentBufferingVideo, currentVideo])

  const handleNext = (e) => { 
    //disable next & previous buttons
    console.log('currentVideo :>> ', currentVideo);

    const nextVideoIndex = currentVideo < videoUrls.length - 1 ? currentVideo + 1 : 0;
    console.log('nextVideoIndex :>> ', nextVideoIndex);
    setCurrentBufferingVideo(nextVideoIndex);
    setIsBuffering(true);
  }

  const doVideoTransition = (currentVideoIndex, nextVideoIndex) => {
    // fade out current video
    // fade in next video
    const newVideoOpacities = [...videoOpacities];
    newVideoOpacities[currentVideoIndex] = 0;
    newVideoOpacities[nextVideoIndex] = 1;
    setVideoOpacities(newVideoOpacities);
  }

  const handleVideoReady = (index) => {
    // console.log(`playing video #${index + 1}`)

    if (!isBuffering) {
      return;
    }

    //wait until next video is loaded, then do video transition
    let nextVideoIndex = currentVideo < videoUrls.length - 1 ? currentVideo + 1 : 0;

    if (currentVideo === null) {
      setVideoOpacities([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    } else {
      doVideoTransition(currentVideo, nextVideoIndex);
      fadeOutVolume(currentVideo);
    }

    setTimeout(() => {
      setCurrentVideo(index);
      setIsBuffering(false);
    }, 3000)
    //  setCurrentVideo(nextVideoIndex);
  }

  const fadeOutVolume = (index) => {
    const video = document.getElementById(`react-video-${index}`);
    // console.log('video :>> ', video);
    video.volume = 1;
    const fadeAudio = setInterval(() => {
      // console.log(`video #${index + 1} volume :>>`, video.volume);
      if ((video.volume -= 0.1) < 0) {
        clearInterval(fadeAudio);
        // console.log('video :>> ', video);
      }
    }, 100);

  }

  //function that switches to previous video
  const handlePrevious = (e) => {
    if (currentVideo > 0) {
      setCurrentVideo(prev => prev - 1)
    } else {
      setCurrentVideo(videoUrls.length - 1)
    }
  }

  const handleBegin = () => {
    setHasBegun(true)
  }

  return (
    <div>
      {!hasBegun &&
        <Image className="begin-button" alt="eye" src={eye} onClick={handleBegin} priority />
      }
      {hasBegun &&
        <>
        <div className="buttons-and-video-wrapper">

          <Image className="image-button left-arrow" src={leftArrowBird} alt="left arrow bird" width="300px" height="200px" onClick={handlePrevious} />

        <div className="player-wrapper">
            {videoUrls.map((url, index) => {
              return (
                <video url="'../../test.webm'" />
                // <ReactPlayer
                //   key={url}
                //   className='react-player'
                //   id={`react-video-${index}`}
                //   src={url}
                //   playing={index === currentVideo || index === currentBufferingVideo}
                //   loop
                //   width={`${WIDTH}px`}
                //   height={`${HEIGHT}px`}
                //   style={{
                //     position: 'absolute',
                //     top: '50%',
                //     left: '50%',
                //     transform: 'translate(-50%, -50%)',
                //     zIndex: index,
                //     transition: 'opacity 5s',
                //     opacity: `${videoOpacities[index]}`
                //   }}
                //   onBuffer={() => console.log(`buffering video #${index + 1}`)}
                //   onPlay={() => handleVideoReady(index)} //() => console.log(`playing video #${index + 1}`)
                //   config={{
                //     youtube: {
                //       playerVars: { disablekb: 1, modestbranding: 1, rel: 0, showinfo: 0, controls: 0 },
                //       attributes: {
                //         id: `video-${index}`
                //       }
                //     },
                //     // file: {
                //     //   attributes: {
                //     //     id: `video-${index}`
                //     //   }
                //     // }

                //   }}
                //   // fileConfig={{ attributes: { id: `video-${index}` } }}

                // />
              )
            })

            }
          </div>
          <Image className="image-button right-arrow" src={rightArrowFlower} alt="right arrow flower" width="300px" height="175px" onClick={handleNext} style={{ float: 'right' }} />
        </div>

        </>
      }
      <style>
        {`
          .buttons-and-video-wrapper {
            width: ${WIDTH}px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .begin-button {
            width: ${beginButtonWidth}px;
            height: ${beginButtonHeight}px;
          }
          .begin-button:hover {
            width: ${beginButtonWidth * 1.05}px;
            height: ${beginButtonHeight * 1.05}px;
          }
          .player-wrapper {
            width: auto;
            height: auto;
            cursor: inherit;
          }
              .react-player {
                // padding-top: 56.25%;
                position: relative;
                cursor: inherit;
              }

                  .react-player>div {
                    position: absolute;
                    // cursor: inherit;
                  }

                      // .react-player>div>iframe {
                      //   cursor: url("../public/lucky-clover.png"), auto;
                      // }

          .image-button {
            width: ${arrowWidth}px;
            
          }
              .image-button.left-arrow {
                height: ${200 / 300 * arrowWidth}px;
                position: relative;
                right: ${arrowWidth}px;
              }

              .image-button.right-arrow {
                height: ${175 / 300 * arrowWidth}px;
                position: relative;
                left: ${arrowWidth}px;
              }

              .image-button.left-arrow:hover {
                translate: -10px;
                transition: translate 1s ease-in-out;
                -webkit-transition: width 1s ease-in-out;
              }

              .image-button.right-arrow:hover {
                translate: 10px;
                transition: translate 1s ease-in-out;
                -webkit-transition: width 1s ease-in-out;
              }
          
        `}
      </style>
    </div>
  );
}

export default App;

// no name title
// no text -- only flowers and birds!
// left side white thing --> flowers and birds booping around
// CALQ logo - also booping/ semi transparent 

// width: 'auto', height: 'auto'
// paddingTop: '56.25%', position: 'relative' 