import React, { useRef } from 'react'
import classNames from 'classnames'
import './Drawer.scss'
import { IconButton } from '../Button'
import BlockBackground from '../BlockBackground'
import useClickOutside from '../../utils/useClickOutside'

export interface IDrawerProps {
  title?: string
  anchor?: 'bottom' | 'left' | 'right' | 'top'
  children?: React.ReactNode
  open: boolean
  onClose: () => void
  closeOnClick?: boolean
  withBlock?: boolean
}

const Drawer = ({
  title,
  anchor = 'left',
  children,
  open = true,
  onClose,
  closeOnClick = false,
  withBlock = false
}: IDrawerProps) => {
  const drawerRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const handleClose = () => {
    if (!closeOnClick || !open) return
    onClose()
  }
  useClickOutside(drawerRef, handleClose)

  return (
    <div className="jui-drawer-root" ref={drawerRef}>
      {
        open && withBlock
          ? (
            <div data-testid='blocker'><BlockBackground zIndex={3} onClick={() => handleClose()}></BlockBackground></div>
            )
          : null
      }
      <div data-testid='drawer' className={classNames({
        'jui-drawer': true,
        'jui-drawer-hide': !open,
        [anchor]: anchor
      })}>
        <div className="jui-drawer-header">
          <div className="start-action" data-testid='actElem'>
            <IconButton varient='flat' type='menu' onClick={() => onClose()}/>
          </div>
          <div className="jui-title">{title}</div>
        </div>
        { children }
      </div>
    </div>
  )
}

export default Drawer
