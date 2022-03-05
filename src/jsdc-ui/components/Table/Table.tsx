import React from 'react'
import { IPropsWithChildren } from '../../utils/jui-ui-interface'
import './Table.scss'
export interface ITableProps extends IPropsWithChildren {

}

const Table = (props: ITableProps) => {
  const { children } = props
  return (
    <table className="jui-table">{ children }</table>
  )
}

export default Table
