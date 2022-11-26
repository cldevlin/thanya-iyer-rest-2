import React from "react";

const ProgressBar = (props) => {
  const { bgcolor, completed, image, totalSteps } = props;

  const containerStyles = {
    height: 68,
    width: '800px',
    // backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
    position: 'absolute',
    top: '50%'
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    // backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div className="loading-bar" style={fillerStyles}>
        {/* <span style={labelStyles}>{`${Math.floor(completed)}%`}</span> */}
      </div>
    </div>
  );
};

export default ProgressBar;