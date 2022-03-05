import React from 'react'
import './DialogActions.scss'

export interface IDialogActionsProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode
}

const DialogActions = (props: IDialogActionsProps) => {
  return (
    <div className='jui-dialog-action'>
      <div className="jui-dialog-action-content">
        {
          props.children
        }
      </div>
    </div>
  )
}

export default DialogActions
