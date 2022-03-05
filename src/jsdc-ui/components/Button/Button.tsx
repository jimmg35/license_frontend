import classNames from 'classnames'
import React, { MouseEvent } from 'react'
import { IPropsWithChildren, IPropsWithSize } from '../../utils/jui-ui-interface'
import './style/button.scss'

export interface IButtonProps extends IPropsWithChildren, IPropsWithSize {
  varient?: 'flat' | 'primary' | 'accent'
  outline?: boolean
  disabled?: boolean,
  startIcon?: React.ReactNode,
  endIcon?: React.ReactNode,
  onClick?: (even: MouseEvent) => void
}

const Button = ({
  varient = 'primary',
  size = 'sm',
  outline = false,
  children,
  onClick,
  disabled,
  startIcon,
  endIcon
}: IButtonProps) => {
  return (
        <button className={classNames({
          'jui-button': true,
          outline,
          flat: varient === 'flat',
          primary: varient === 'primary',
          accent: varient === 'accent',
          sm: size === 'sm',
          md: size === 'md',
          larg: size === 'larg',
          xsm: size === 'xsm'
        })} onClick={onClick} disabled={disabled}>
            {startIcon}
            {
              children
                ? (
                    <span className='jui-button-label'>{children}</span>
                  )
                : null
            }
            {endIcon}
        </button>

  )
}
export default Button
