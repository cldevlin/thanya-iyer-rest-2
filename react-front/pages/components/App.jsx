import { useState, useEffect } from "react";
import Image from 'next/image'
import ReactPlayer from "react-player";
import leftArrowBird from '../../public/left-arrow-bird.png'
import rightArrowFlower from '../../public/right-arrow-flower.png'
import eye from '../../public/eye.png'

//dimensions: w 200 x  h 232
import blueYellowBird from '../../public/weird-blue-and-yellow-bird.png'
const blueYellowBirdWidth = 200;
const blueYellowBirdHeight = 232;

//dimensions: w 200 x h 196
import pinkDaisyFlower from '../../public/pink-daisy-flower.png'
const pinkDaisyFlowerWidth = 200;
const pinkDaisyFlowerHeight = 196;

//deminsions: 200 x 219
import redLotus from '../../public/red-lotus.png'
const redLotusWidth = 200;
const redLotusHeight = 219;

//50 x 47
import greenEggFlower from '../../public/green-egg-flower.png'

//200 x 160
import calqLogo from '../../public/logo-calq-noir.png'
const calqLogoWidth = 200;
const calqLogoHeight = 160;
import ProgressBar from "./ProgressBar";

const videoUrls = [
  'videos/1_instrumentals_intro.mp4',
  'videos/2_Slow_burn.mp4',
  'videos/3_instrumentals_transition.mp4',
  'videos/4_leave_the_room.mp4',
  'videos/5_instrumentals_transition.mp4',
  'videos/6_new_kind_of_swim.mp4',
  'videos/7_instrumentals_transition.mp4',
  'videos/8_float_on.mp4',
  'videos/9_instrumentals_transition.mp4',
  'videos/10_I_hope_I_see_you_soon.mp4',
  'videos/11_instrumentals_outro_reverse.mp4'
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

  const [buttonsAreDisabled, setButtonsAreDisabled] = useState(true)
  const [readyCount, setReadyCount] = useState(0);

  console.log('readyCount :>> ', readyCount);

  const handleNext = (e) => { 
    if (buttonsAreDisabled) {
      return;
    }
    setButtonsAreDisabled(true);

    const currentVideoIndex = currentVideo;
    const nextVideoIndex = currentVideo < videoUrls.length - 1 ? currentVideo + 1 : 0;
    console.log('nextVideo :>> ', nextVideoIndex + 1);
    playVideo(nextVideoIndex)
    doVideoTransition(currentVideo, nextVideoIndex);
    setTimeout(() => {
      pauseAndReset(currentVideoIndex)
      setCurrentVideo(nextVideoIndex);
      setButtonsAreDisabled(false)
    }, 3000)
  }

  const handlePrevious = (e) => {
    if (buttonsAreDisabled) {
      return;
    }
    setButtonsAreDisabled(true)

    const currentVideoIndex = currentVideo;
    const nextVideoIndex = currentVideo > 0 ? currentVideo - 1 : videoUrls.length - 1;

    playVideo(nextVideoIndex)
    doVideoTransition(currentVideo, nextVideoIndex);
    setTimeout(() => {
      pauseAndReset(currentVideoIndex)
      setCurrentVideo(nextVideoIndex);
      setButtonsAreDisabled(false)
    }, 3000)
  }

  const pauseAndReset = (index) => {
    const vid = document.getElementById(`react-video-${index}`);
    vid.pause();
    vid.currentTime = 0;
  }

  const playVideo = (index) => {
    const vid = document.getElementById(`react-video-${index}`);
    vid.volume = 1;
    vid.play()
  }

  const doVideoTransition = (currentVideoIndex, nextVideoIndex) => {
    // audio fade 3 seconds
    fadeOutVolume(currentVideo);

    // visual fade 3 seconds
    const newVideoOpacities = [...videoOpacities];
    newVideoOpacities[currentVideoIndex] = 0;
    newVideoOpacities[nextVideoIndex] = 1;
    setVideoOpacities(newVideoOpacities);
  }

  const handleVideoReady = (index) => {
    if (index === 0 && currentVideo === null) {
      handleFirstVidReady()
    }
    setReadyCount(prev => prev + 1)
  }

  const handleFirstVidReady = () => {
    playVideo(0);
    setVideoOpacities([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setCurrentVideo(0)
    setTimeout(() => {
      setButtonsAreDisabled(false)
    }, 3000)
  }


  const fadeOutVolume = (index) => {
    const video = document.getElementById(`react-video-${index}`);
    const fadeAudio = setInterval(() => {
      // console.log(`video #${index + 1} volume :>>`, video.volume);
      if ((video.volume - 0.1) < 0) {
        clearInterval(fadeAudio);
        return;
      }
      video.volume -= 0.1;
    }, 300);
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
        <div>
          {readyCount < 11 &&
            < ProgressBar
              bgcolor="#000000"
              completed={readyCount > 11 ? 100 : readyCount / 11 * 100}
              image={greenEggFlower}
              totalSteps={11}
            />
          }

          <div className="animated-icons left">
            <Image className="blue-yellow-bird" src={blueYellowBird} alt="" />
            <Image className="pink-daisy-flower" src={pinkDaisyFlower} alt="" />
            {/* <Image className="pink-daisy-flower" src={pinkDaisyFlower} alt="" />
            <Image className="pink-daisy-flower" src={pinkDaisyFlower} alt="" />
            <Image className="pink-daisy-flower" src={pinkDaisyFlower} alt="" /> */}

          </div>

          <div className="animated-icons right">
            <Image className="red-lotus" src={redLotus} alt="" />
            <Image className="calq-logo" src={calqLogo} alt="" />

          </div>


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
                    onCanPlayThrough={() => handleVideoReady(index)}

                    onPlay={() => console.log('playing #', index + 1)}
                    onStalled={() => console.log('stalled #', index + 1)}
                  />
                )
              })

              }
            </div>

            <Image className="image-button right-arrow" src={rightArrowFlower} alt="right arrow flower" width="300px" height="175px" onClick={handleNext} style={{ float: 'right' }} />

          </div>
        </div>
      }

      <style>
        {`
          .animated-icons {
            position: absolute;

            height: 100vh;
            width: 10vw;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            // border: black 5px solid;
          }

          .animated-icons.left {
            left: 30px;
            top: 0;
          }
              .blue-yellow-bird {
                width: ${blueYellowBirdWidth * 0.4}px;
                height: ${blueYellowBirdHeight * 0.4}px;
                animation: rotation 5s infinite linear;
              }
              .pink-daisy-flower {
                width: ${pinkDaisyFlowerWidth * 0.45}px;
                height: ${pinkDaisyFlowerHeight * 0.45}px;
                margin-left: 40px;

                animation: vibrate 0.5s;
                animation-iteration-count: infinite;
              }

          .animated-icons.right {
            right: 30px;
            top: 0;
          }
              .red-lotus {
                width: ${redLotusWidth * 0.47}px;
                height: ${redLotusHeight * 0.47}px;
                margin-right: 10px;
                animation: vibrate 0.5s;
                animation-iteration-count: infinite;
              }
              .calq-logo {
                width: ${calqLogoWidth * 0.4}px;
                height: ${calqLogoHeight * 0.4}px;
                margin-right: 50px;
                opacity: 0.5;
                animation: rotationLeft 8s infinite linear;
              }

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
                translate: -20px;
                transition: translate 0.5s;
                // -webkit-transition: width 1s ease-in-out;
              }

              .image-button.right-arrow:hover {
                translate: 20px;
                transition: translate 0.5s;
                // -webkit-transition: width 1s ease-in-out;
              }

              @keyframes rotation {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(359deg);
                }
              }

              @keyframes rotationLeft {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(-359deg);
                }
              }

              @keyframes vibrate {
                0% { transform: rotate(0deg); }
                10% { transform: rotate(-1deg); }
                20% { transform: rotate(1deg); }
                30% { transform: rotate(0deg); }
                40% { transform: rotate(1deg); }
                50% { transform: rotate(-1deg); }
                60% { transform: rotate(0deg); }
                70% { transform: rotate(-1deg); }
                80% { transform: rotate(1deg); }
                90% { transform: rotate(0deg); }
                100% { transform: rotate(-1deg); }
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