import { useState, useEffect } from "react";
import Image from 'next/image'
import ReactPlayer from "react-player";

import ProgressBar from "./ProgressBar";

import leftArrowBird from '../../public/left-arrow-bird.png'
import rightArrowFlower from '../../public/right-arrow-flower.png'
import eye from '../../public/eye.png'

import blueYellowBird from '../../public/weird-blue-and-yellow-bird.png'
const blueYellowBirdWidth = 200;
const blueYellowBirdHeight = 232;
import pinkDaisyFlower from '../../public/pink-daisy-flower.png'
const pinkDaisyFlowerWidth = 200;
const pinkDaisyFlowerHeight = 196;

import redLotus from '../../public/red-lotus.png'
const redLotusWidth = 200;
const redLotusHeight = 219;

import greenEggFlower from '../../public/green-egg-flower.png'

import calqLogo from '../../public/logo-calq-noir.png'
const calqLogoWidth = 200;
const calqLogoHeight = 160;

import birdOne from '../../public/bird-1.png';
const birdOneWidth = 150;
const birdOneHeight = 155;

import flower from '../../public/flower.png';
const flowerWidth = 150;
const flowerHeight = 250;

import paintDots from '../../public/paint-dots.png'
const paintDotsWidth = 500;
const paintDotsHeight = 500;

import paintTwo from '../../public/paint-pt-2.png';
const paintTwoWidth = 500;
const paintTwoHeight = 477;

import restTwoPencil from '../../public/rest-two-pencil.png';
const restTwoPencilWidth = 300;
const restTwoPencilHeight = 260;

import restThreePencil from '../../public/rest-three-pencil.png';
const restThreePencilWidth = 300;
const restThreePencilHeight = 260;


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
  const [allVidsReady, setAllVidsReady] = useState(false);
  // handle visibility of credits in bottom left corner
  const [bottomLeftHover, setBottomLeftHover] = useState(false);


  useEffect(() => {
    console.log('readyCount :>> ', readyCount);
    if (readyCount === 11) {
      setAllVidsReady(true);
      handleFirstVidReady()
    }
  }, [readyCount])

  const handleNext = (e) => {
    if (buttonsAreDisabled) {
      return;
    }
    setButtonsAreDisabled(true);

    const currentVideoIndex = currentVideo;
    const nextVideoIndex = currentVideo < videoUrls.length - 1 ? currentVideo + 1 : 0;
    // console.log('nextVideo :>> ', nextVideoIndex + 1);
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
    // if (index === 0 && currentVideo === null) {
    //   handleFirstVidReady()
    // }
    console.log('ready #', index + 1)

    setReadyCount(prev => prev + 1)
  }

  const handleStalled = (index) => {
    console.log('stalled #', index + 1)
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
          {!allVidsReady &&
            < ProgressBar
              bgcolor="#000000"
              completed={readyCount > 11 ? 100 : readyCount / 11 * 100}
              image={greenEggFlower}
              totalSteps={11}
            />
          }

          <div className="animated-icons left">
            <Image className="blue-yellow-bird" src={blueYellowBird} alt="blue-yellow-bird" />
            <Image className="pink-daisy-flower" src={pinkDaisyFlower} alt="pink-daisy-flower" />

            <div></div>
            <div></div>

            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div
              className="bottom-left-corner"
              onMouseEnter={() => setBottomLeftHover(true)}
              onMouseLeave={() => setBottomLeftHover(false)}
            >
              <Image className="paint-dots" src={paintDots} alt="paint-dots" style={bottomLeftHover ? { opacity: 0 } : { opacity: 1 }} />
              <div className="credits" style={bottomLeftHover ? { opacity: 1 } : { opacity: 0 }} >
                <p>Sophie Grouev - Videos</p>
                <p>Amanda Stormyr - Painting</p>
                <p>Claire Devlin - Website</p>
              </div>
            </div>
          </div>

          <div className="animated-icons center">
            <Image className="flower" src={flower} alt="flower" />
            <Image className="bird-1" src={birdOne} alt="" />
            <Image className="pink-daisy-flower" src={pinkDaisyFlower} alt="pink-daisy-flower" />
            <Image className="paint-2" src={paintTwo} alt="paint-2" />
          </div>

          <div className="animated-icons right">
            {/* <Image className="rest-two-pencil" src={restTwoPencil} alt="" /> */}
            <a className="bandcamp-link" href="https://thanyaiyer.bandcamp.com" target="_blank" rel="noopener noreferrer">
              <Image className="rest-three-pencil" src={restThreePencil} alt="" />
            </a>
            <div></div>
            <Image className="red-lotus" src={redLotus} alt="" />
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <Image className="bird-1" src={birdOne} alt="" />
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
                    onStalled={() => handleStalled(index)}
                    // https://stackoverflow.com/questions/28105950/html5-video-stalled-event
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
        @import url(&apos;https://fonts.googleapis.com/css2?family=Just+Me+Again+Down+Here&display=swap&apos;);
      </style>

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
                width: ${blueYellowBirdWidth * 0.3}px;
                height: ${blueYellowBirdHeight * 0.3}px;
                animation: rotation 5s infinite linear;
              }
              .pink-daisy-flower {
                width: ${pinkDaisyFlowerWidth * 0.3}px;
                height: ${pinkDaisyFlowerHeight * 0.3}px;
                margin-left: 60px;

                animation: vibrate 0.5s;
                animation-iteration-count: infinite;
              }

                  .paint-dots {
                    width: ${paintDotsWidth * 0.3}px;
                    height: ${paintDotsHeight * 0.3}px;

                    animation: vibrate 2s;
                    animation-iteration-count: infinite;
                  }
                  .credits {
                    font-family: 'Just Me Again Down Here', cursive;
                    font-size: 20px;
                    color: grey;
                    position: absolute;
                    bottom: 20px;
                    left: -5px;
                    width: 200px;
                    margin: 2em 0;
                    // opacity: 0;
                  }
                      .credits>p {
                        margin: 0;
                      }

          .animated-icons.center {
            left: 50%;
            top: 0;
            justify-content: space-between;

          }
              .flower {
                width: ${flowerWidth * 0.3}px;
                height: ${flowerHeight * 0.3}px;
                margin-left: 20%;
                animation: pendulumOne 8s infinite linear;
              }
              .center>.bird-1 {
                position: absolute;
                top: 3%;
                left: -450px;
                animation: slideOne 15s infinite linear;

              }
              .center>.pink-daisy-flower {
                position: absolute;
                left: -330px;
                bottom: 5%;
              }
              .paint-2 {
                width: ${paintTwoWidth * 0.3}px;
                height: ${paintTwoHeight * 0.3}px;
                position: absolute;
                bottom: 0;
                left: 100px;
                animation: slideOne 12s infinite linear;
              }

          .animated-icons.right {
            right: 30px;
            top: 0;
          }
              .rest-three-pencil {
                width: ${restThreePencilWidth * 0.3}px;
                height: ${restThreePencilHeight * 0.3}px;
                animation: seeSaw 1s infinite linear;
              }
              .red-lotus {
                width: ${redLotusWidth * 0.3}px;
                height: ${redLotusHeight * 0.3}px;
                margin-right: 10px;
                animation: vibrate 1s;
                animation-iteration-count: infinite;
              }
              .bird-1 {
                width: ${redLotusWidth * 0.3}px;
                height: ${redLotusHeight * 0.3}px;
                margin-left: 60px;
                animation: pendulumOne 5s infinite linear;
                
              }
              .calq-logo {
                width: ${calqLogoWidth * 0.3}px;
                height: ${calqLogoHeight * 0.3}px;
                margin-left: -50px;
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

              @keyframes pendulumOne {
                0% { transform: rotate(0deg); }
                12.5% { transform: rotate(-45deg); }
                25% { transform: rotate(0deg); }
                37.5% { transform: rotate(45deg); }
                50% { transform: rotate(0deg); }
                62.5% { transform: rotate(-45deg); }
                75% { transform: rotate(0deg); }
                87.5% { transform: rotate(45deg); }
                100% { transform: rotate(0deg); }
              }

              @keyframes pendulumTwo {
                0% { transform: rotate(0deg); }
                10% { transform: rotate(-100deg); }
                20% { transform: rotate(20deg); }
                30% { transform: rotate(-30deg); }
                40% { transform: rotate(10deg); }
                50% { transform: rotate(0deg); }
                60% { transform: rotate(50deg); }
                70% { transform: rotate(45deg); }
                80% { transform: rotate(110deg); }
                90% { transform: rotate(200deg); }
                100% { transform: rotate(359deg); }
              }

              @keyframes slideOne {
                0% { transform: translateX(0px); }
                10% { transform: translateX(20px); }
                20% { transform: translateX(0px); }
                30% { transform: translateX(20px); }
                40% { transform: translateX(0px); }
                50% { transform: translateX(20px); }
                60% { transform: translateX(0px); }
                70% { transform: translateX(20px); }
                80% { transform: translateX(0px); }
                90% { transform: translateX(20px); }
                100% { transform: translateX(0px); }
              }

              @keyframes seeSaw {
                0% {
                  transform: rotate(5deg);
                }
          
                25% {
                    transform: rotate(0deg);
                }
          
                50% {
                    transform: rotate(-5deg);
                }
          
                75% {
                    transform: rotate(0deg);
                }
          
                100% {
                    transform: rotate(5deg);
                }
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