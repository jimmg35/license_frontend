import classNames from 'classnames'
import React from 'react'
import { IPropsWithChildren, IPropsWithDisplayVarient } from '../../utils/jui-ui-interface'
import './TableContainer.scss'

export interface ITableContainerProps extends IPropsWithChildren, IPropsWithDisplayVarient {

}

const TableContainer = (props: ITableContainerProps) => {
  const { children, varient = 'primary', hollow = false } = props
  return (
    <div className={classNames({
      'jui-tableContainer': true,
      [varient]: varient,
      hollow
    })}>{ children }</div>
  )
}

export default TableContainer
