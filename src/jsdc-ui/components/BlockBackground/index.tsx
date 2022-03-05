import classNames from 'classnames'
import React from 'react'
import './BlockBackground.scss'

export interface IBlockBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode
  zIndex?: 0 | 1 | 2 | 3 | 4 | 5
}

const BlockBackground = (props: IBlockBackgroundProps) => {
  const { zIndex = 3 } = props
  return (
    <div className={classNames({
      'jui-block-bg': true,
      [`zIndex-${zIndex}`]: true
    })} onClick={props.onClick}>
      {props.children}
    </div>
  )
}

export default BlockBackground
