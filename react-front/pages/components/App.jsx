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
        <Image className="begin-button" alt="eye" src={eye} onClick={handleBegin} />
      }
      {hasBegun &&
        <>
          <div style={{ padding: '10px 0' }}>
          {/* <button style={{ marginRight: '10px' }}>← Previous</button> */}
          {/* <button onClick={handleNext} style={{ float: 'right' }}>Next →</button> */}
          <Image className="image-button left-arrow" src={leftArrowBird} alt="left arrow bird" width="300px" height="200px" onClick={handlePrevious} />
          <Image className="image-button right-arrow" src={rightArrowFlower} alt="right arrow flower" width="300px" height="175px" onClick={handleNext} style={{ float: 'right' }} />
          </div>

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
        </>
      }
      <style>
        {`
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
          }
          .react-player {
            // padding-top: 56.25%;
            position: relative;
          }

          .react-player>div {
            position: absolute;
          }

          .image-button {
            width: ${arrowWidth}px;
          }
            .image-button.left-arrow {
              height: ${200 / 300 * arrowWidth}px;
            }

            .image-button.right-arrow {
              height: ${175 / 300 * arrowWidth}px;
            }

          .image-button:hover {
            width: ${arrowWidth * 1.05}px;

            transition: width .1s;
            -webkit-transition: width .1s;
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