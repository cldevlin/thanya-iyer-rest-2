import { useState, useEffect } from "react";
import ReactPlayer from "react-player";

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
    console.log('clicked');
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
        <button onClick={handleBegin} style={{ fontSize: '20px' }}>Begin</button>
      }
      {hasBegun &&
        <>
          <div style={{ padding: '10px 0' }}>
            <button style={{ marginRight: '10px' }}>← Previous</button>
            <button onClick={handleNext} style={{ float: 'right' }}>Next →</button>
          </div>

          <div className="player-wrapper">
            <ReactPlayer
              className='react-player'
              url={videoUrls[currentVideo]}
              playing={isPlaying}
              loop
              width={`${WIDTH}px`}
              height={`${HEIGHT}px`}
            />
          </div>
        </>
      }
      <style>
        {`
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