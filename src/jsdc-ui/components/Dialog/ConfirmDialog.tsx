import React from 'react'
import { Dialog, DialogActions, DialogContent } from '.'
import { Button } from '../Button'

export interface IConfirmDialogProps {
  open: boolean
  title?: string
  canceltext?: string
  confirmtext?: string
  msg?: string
  onConfirm: () => void
  onCancel: () => void
  onclose: () => void
}

const ConfirmDialog = ({
  title,
  open,
  msg,
  onCancel, onConfirm,
  canceltext = '取消',
  confirmtext = '確認',
  onclose
}: IConfirmDialogProps) => {
  return (
    <Dialog open={open} closeOnClick={false} title={title} onClose={onclose}>
      <DialogContent>
        {msg}
      </DialogContent>
      <DialogActions>
        <Button size='md' varient='flat' outline onClick={() => onCancel()} children={canceltext} />
        <Button size='md' varient='flat' outline onClick={() => onConfirm()} children={confirmtext} />
      </DialogActions>
    </Dialog>
  )
}
export default ConfirmDialog
