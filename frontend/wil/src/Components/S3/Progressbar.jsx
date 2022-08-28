import React from 'react'
import "./Progressbar.css"

const ProgressBar = ({progress}) => {
  return (
    <div className='progress-bar-boundary'>
        <div style={{width: `${progress}`}}>
            {progress} 
        </div>
    </div> 
  )
}

export default ProgressBar