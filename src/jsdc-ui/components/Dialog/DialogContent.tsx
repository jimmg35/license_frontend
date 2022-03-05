import React from 'react'
import './DialogContent.scss'

export interface IDialogContentProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode
}

const DialogContent = (props: IDialogContentProps) => {
  return (
    <div className='jui-dialog-content'>
      {
        props.children
      }
    </div>
  )
}

export default DialogContent
