import classNames from 'classnames'
import React from 'react'
import { IPropsWithChildren, IPropsWithDisplayVarient } from '../../utils/jui-ui-interface'
import './TableHeader.scss'

export interface ITableHeaderProps extends IPropsWithChildren, IPropsWithDisplayVarient {

}

const TableHeader = (props: ITableHeaderProps) => {
  const { children, varient = 'primary', hollow = false } = props
  return (
    <thead className={classNames({
      'jui-tableHeader': true,
      [varient]: varient,
      hollow
    })
    }>{ children }</thead>
  )
}

export default TableHeader
