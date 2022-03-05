import classNames from 'classnames'
import React from 'react'
import { IPropsWithChildren } from '../../utils/jui-ui-interface'
import './TableRow.scss'

export interface ITableRowProps extends IPropsWithChildren {
  onClick?: (e: React.MouseEvent<HTMLTableRowElement>, value: ITableRowProps['value']) => void
  value?: any
  active?: boolean
}

const TableRow = (props: ITableRowProps) => {
  const { children, onClick, value, active = false } = props
  const handleClick: ITableRowProps['onClick'] = (e) => {
    if (onClick) {
      onClick(e, value)
    }
  }
  return (
    <tr className={classNames({
      'jui-tableRow': true,
      active
    })} onClick={(e) => handleClick(e, value)}>{ children }</tr>
  )
}

export default TableRow
