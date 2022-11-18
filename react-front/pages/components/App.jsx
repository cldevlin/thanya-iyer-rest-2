import { useState, useEffect } from "react";
import Image from 'next/image'
import ReactPlayer from "react-player";
import leftArrowBird from '../../public/left-arrow-bird.png'
import rightArrowFlower from '../../public/right-arrow-flower.png'
import eye from '../../public/eye.png'

const videoUrls = [
  'videos/1_instrumentals_intro.mp4',
  'videos/2_Slow_burn.mp4',
  'videos/3_instrumentals_transition.mp4',
  'videos/4_leave_the_room.m4v',
  'videos/5_instrumentals_transition.m4v',
  'videos/6_new_kind_of_swim.m4v',
  'videos/7_instrumentals_transition.m4v',
  'videos/8_float_on.m4v',
  'videos/9_instrumentals_transition.m4v',
  'videos/10_I_hope_I_see_you_soon.m4v',
  'videos/11_instrumentals_outro_reverse.m4v'
]

const WIDTH = 900;
const HEIGHT = WIDTH * 480 / 960;

const arrowWidth = 200;

const beginButtonWidth = 400;
const beginButtonHeight = 1394 / 1517 * beginButtonWidth;


const App = () => {
  // handles the Eye button
  const [hasBegun, setHasBegun] = useState(false)
  //keeps track of which video is playing
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoOpacities, setVideoOpacities] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);


  const handleNext = (e) => { 
    //disable next & previous buttons
    console.log('currentVideo :>> ', currentVideo);

    const currentVideoIndex = currentVideo;
    const nextVideoIndex = currentVideo < videoUrls.length - 1 ? currentVideo + 1 : 0;
    console.log('nextVideo :>> ', nextVideoIndex + 1);
    playVideo(nextVideoIndex)
    doVideoTransition(currentVideo, nextVideoIndex);
    setTimeout(() => {
      pauseAndReset(currentVideoIndex)
      setCurrentVideo(nextVideoIndex);
    }, 3000)

  }

  const pauseAndReset = (index) => {
    const vid = document.getElementById(`react-video-${index}`);
    vid.pause();
    vid.currentTime = 0;
  }

  const playVideo = (index) => {
    const vid = document.getElementById(`react-video-${index}`);
    vid.play()
  }

  const doVideoTransition = (currentVideoIndex, nextVideoIndex) => {
    // audio fade
    fadeOutVolume(currentVideo);

    // visual fade:
    const newVideoOpacities = [...videoOpacities];
    newVideoOpacities[currentVideoIndex] = 0;
    newVideoOpacities[nextVideoIndex] = 1;
    setVideoOpacities(newVideoOpacities);
  }

  const handleFirstVidReady = () => {
    playVideo(0);
    setVideoOpacities([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setCurrentVideo(0)
  }


  const fadeOutVolume = (index) => {
    const video = document.getElementById(`react-video-${index}`);
    const fadeAudio = setInterval(() => {
      console.log(`video #${index + 1} volume :>>`, video.volume);
      if ((video.volume - 0.1) < 0) {
        clearInterval(fadeAudio);
        return;
      }
      video.volume -= 0.1;
    }, 300);
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
                <video
                  src={url}
                  key={url}
                  className="react-player"
                  id={`react-video-${index}`}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: index,
                    transition: 'opacity 5s',
                    opacity: `${videoOpacities[index]}`,
                    width: `${WIDTH}px`,
                    height: `${HEIGHT}px`,
                  }}
                  loop
                  onCanPlayThrough={() => index === 0 && currentVideo === null && handleFirstVidReady()}

                  onPlay={() => console.log('playing #', index + 1)}
                  onStalled={() => console.log('stalled #', index + 1)}
                />
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