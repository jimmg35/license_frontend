import classNames from 'classnames'
import React from 'react'
import { IPropsWithChildren } from '../../utils/jui-ui-interface'
import './List.scss'

export interface IListProps extends IPropsWithChildren {
  enableSelection?: boolean
}

const List = ({
  children,
  enableSelection
}: IListProps) => {
  return (
    <ul className={classNames({
      'jui-list': true,
      enableSelection
    })}>
      { children }
    </ul>
  )
}

export default List
