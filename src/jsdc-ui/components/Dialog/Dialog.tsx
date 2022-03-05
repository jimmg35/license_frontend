import React from 'react'
import BlockBackground from '../BlockBackground'
import { Button } from '../Button'
import './Dialog.scss'

export interface IDialogProps extends React.HTMLProps<HTMLDivElement> {
  title?: string
  children?: React.ReactNode
  open: boolean
  closeOnClick?: boolean
  withCloseButton?: boolean
  onClose?: () => void
  onOpen?: () => void
}

const Dialog = ({
  open,
  title,
  children,
  closeOnClick = true,
  withCloseButton = false,
  onClose = () => { '' }
}: IDialogProps) => {
  const handleBGclick = () => {
    if (!closeOnClick) return
    onClose()
  }
  const handleClose = () => {
    onClose()
  }

  return (
    open
      ? (
        <BlockBackground zIndex={4} onClick={() => handleBGclick()}>
          <div className='jui-dialog' onClick={e => e.stopPropagation()}>
            <div className="jui-title">
              <div className="jui-text">{title}</div>
              {
                withCloseButton
                  ? (
                      <div className="jui-action">
                        <Button size='xsm' varient='flat' onClick={() => handleClose()} children={'✖'} />
                      </div>
                    )
                  : null
              }
            </div>
            <div className="jui-dialog-content-container">{children}</div>
          </div>
        </BlockBackground>
        )
      : null
  )
}

export default Dialog
