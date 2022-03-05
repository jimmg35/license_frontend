import classNames from 'classnames'
import React from 'react'
import { IPropsWithChildren, IPropsWithDisplayVarient } from '../../utils/jui-ui-interface'
import './TableCell.scss'

export interface ITableCellProps extends IPropsWithChildren, IPropsWithDisplayVarient {
  asHead?: boolean
}

const TableCell = (props: ITableCellProps) => {
  const { children, asHead = false, varient = 'primary', hollow = false } = props
  return (
    asHead
      ? (
        <th className={classNames({
          'jui-tableCell': true,
          'jui-tableCell-head': true,
          [varient]: varient,
          hollow
        })}>{ children }</th>
        )
      : <td className={classNames({
        'jui-tableCell': true,
        [varient]: varient,
        hollow
      })}>{ children }</td>
  )
}

export default TableCell
