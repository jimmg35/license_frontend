// import classNames from 'classnames'
import React from 'react'
import Icon from '../../Icons'
import { IIconProps } from '../../Icons/Icon'
import Button, { IButtonProps } from './Button'
import './style/IconButton.scss'

export interface IIconButtonProps extends IIconProps, IButtonProps {

}

const IconButton = (props: IIconButtonProps) => {
  // const {
  //   size = 'md',
  //   light
  // } = props
  // return (
  //   <div className={classNames({
  //     'jui-icon-button': true,
  //     light,
  //     sm: size === 'sm',
  //     md: size === 'md',
  //     larg: size === 'larg',
  //     xsm: size === 'xsm'
  //   })}>
  //     <Icon {...props} light={false}/>
  //   </div>
  // )
  return (
    <div className="jui-icon-button">
      <Button {...props} startIcon={<Icon {...props} light />} />
    </div>
  )
}

export default IconButton
