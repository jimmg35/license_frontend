import React from 'react'
import classNames from 'classnames'
import './MainBoard.scss'

export interface IMainBoardParams {
  open: boolean
}

const MainBoard = (props: IMainBoardParams) => {
  // const [open] = useState<boolean>(props.open)

  return (
    <div className={
      classNames({
        'main-board': true
      }, {
        hide: !props.open
      })
    }>
      <p>main board</p>
    </div>
    // <div>1231sss23 {open}</div>
  )
}

export default MainBoard
