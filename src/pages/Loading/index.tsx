import React from 'react'
import CircularProgress from '../../jsdc-ui/components/CircularProgress'
import './index.scss'

const Loading = () => {
  return (
    // <div>loading</div>
    <div className='loading-page'>
      <div className='loading-box'>
        <div className='loading-col'>
          <div className='loading-row'>
            <CircularProgress></CircularProgress>
          </div>
          <div className='loading-row'>
            <p>頁面載入中</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Loading
