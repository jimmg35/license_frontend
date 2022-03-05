import React from 'react'
import { IPropsWithChildren } from '../../utils/jui-ui-interface'
import './ListItem.scss'

export interface IListItemProps extends IPropsWithChildren {
  startAcriont?: React.ReactNode
  endAcriont?: React.ReactNode
  onClick?: () => void
}

const ListItem = ({
  children,
  startAcriont,
  endAcriont,
  onClick
}: IListItemProps) => {
  return (
    <li className="jui-listItem" onClick={onClick}>
      <div className="jui-rowSection">
        {
          startAcriont ? <div className="jui-startAction">{ startAcriont }</div> : null
        }
        { <div className="jui-mainSection">{ <span>{children}</span> }</div> }
        {
          endAcriont ? <div className="jui-endAcriont">{ endAcriont }</div> : null
        }
      </div>
    </li>
  )
}

export default ListItem
