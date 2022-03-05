import React from 'react'
import classNames from 'classnames'
import './SecondBoard.scss'

export interface ISecondBoardParams {
  open: boolean
}

const SecondBoard = (props: ISecondBoardParams) => {
  // const [open] = useState<boolean>(props.open)

  return (
    <div className={
      classNames({
        'second-board': true
      }, {
        hide: !props.open
      })
    }>
      <p>second board</p>
    </div>
    // <div>1231sss23 {open}</div>
  )
}

export default SecondBoard
