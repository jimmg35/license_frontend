import React from 'react'
import { IPropsWithChildren } from '../../utils/jui-ui-interface'
import './TableBody.scss'

export interface ITableBodyProps extends IPropsWithChildren {

}

const TableBody = (props: ITableBodyProps) => {
  const { children } = props
  return (
    <tbody className="jui-tableBody">{ children }</tbody>
  )
}

export default TableBody
