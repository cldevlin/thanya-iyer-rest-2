import { useState, useEffect } from "react";
import Image from 'next/image'
import ReactPlayer from "react-player";
import leftArrowBird from '../../public/left-arrow-bird.png'
import rightArrowFlower from '../../public/right-arrow-flower.png'
import eye from '../../public/eye.png'

const videoUrls = [
  ' https://youtu.be/tKWryqqj-0c',
  ' https://youtu.be/8aTC3pbooKM',
  ' https://youtu.be/Ba0-_qvHzsM',
  ' https://youtu.be/xm_bch6Yj60',
  ' https://youtu.be/ZyApBa2zp3U',
  ' https://youtu.be/L0zlFvFQvXo',
  ' https://youtu.be/5Y4o1boFNmg',
  ' https://youtu.be/OfCTG6ublDo',
  ' https://youtu.be/54DLyvf-72g',
  ' https://youtu.be/s4F_IceGcZg',
  ' https://youtu.be/as127zNyQ6k'
]

const WIDTH = 900;
const HEIGHT = WIDTH * 480 / 960;

const arrowWidth = 200;

const beginButtonWidth = 400;
const beginButtonHeight = 1394 / 1517 * beginButtonWidth;


const App = () => {

  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasBegun, setHasBegun] = useState(false)

  const handleNext = (e) => {
    e.preventDefault()
    if (currentVideo < videoUrls.length - 1) {
      setCurrentVideo(prev => prev + 1)
    } else {
      setCurrentVideo(0)
    }
  }

  //function that switches to previous video
  const handlePrevious = (e) => {
    e.preventDefault()
    if (currentVideo > 0) {
      setCurrentVideo(prev => prev - 1)
    } else {
      setCurrentVideo(videoUrls.length - 1)
    }
  }

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => {
  //       console.log('res.data :>> ', res.data);
  //     })
  //   // .then((data) => setData(data.message));
  // }, []);

  const handleBegin = () => {
    setHasBegun(true)
    setIsPlaying(true)
  }

  return (
    <div>
      {/* <h1>Thanya Iyer | rest</h1> */}
      {!hasBegun &&
        // <button onClick={handleBegin} style={{ fontSize: '20px' }}>Begin</button>
        <Image className="begin-button" alt="eye" src={eye} onClick={handleBegin} priority />
      }
      {hasBegun &&
        <>
        <div className="buttons-and-video-wrapper">

          <Image className="image-button left-arrow" src={leftArrowBird} alt="left arrow bird" width="300px" height="200px" onClick={handlePrevious} />

        <div className="player-wrapper">
            <ReactPlayer
              className='react-player'
              url={videoUrls[currentVideo]}
              playing={isPlaying}
              loop
              width={`${WIDTH}px`}
              height={`${HEIGHT}px`}
            config={{
              file: {
                attributes: {
                  controlsList: "nofullscreen",
                },
              },
            }}
            />
          </div>
          <Image className="image-button right-arrow" src={rightArrowFlower} alt="right arrow flower" width="300px" height="175px" onClick={handleNext} style={{ float: 'right' }} />
        </div>

        </>
      }
      <style>
        {`
          .buttons-and-video-wrapper {
            display: flex;
            justify-content: center;
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
            position: relative;
            top: 0;
            left: 0;
          }
              .image-button.left-arrow {
                height: ${200 / 300 * arrowWidth}px;
              }

              .image-button.right-arrow {
                height: ${175 / 300 * arrowWidth}px;
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