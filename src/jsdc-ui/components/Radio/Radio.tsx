import classNames from 'classnames'
import React, { useState, useEffect } from 'react'
import './Radio.scss'
import { v4 as uuidv4 } from 'uuid'

export interface IRadioProps extends React.HTMLProps<HTMLInputElement> {
  id? : string
  text? : string
  name? : string
  value? : string
  checked? : boolean
  disabled? : boolean
  hightlight? : boolean
  setSelect? : (selectStatus: boolean) => void
}

const Radio: React.FC<IRadioProps> = (props: IRadioProps) => {
  const [localId, setlocalId] = useState('')

  const {
    id = uuidv4(),
    text = '',
    name = '',
    value = '',
    checked = false,
    disabled = false,
    hightlight = false,
    setSelect = undefined
  } = props

  useEffect(() => {
    setlocalId(id)
    console.log(hightlight)
  }, [])

  const handleClick = () => {
    if (setSelect !== undefined) {
      if (!disabled) {
        setSelect(!checked)
      }
    }
  }

  return (
    <div className='jui-radio'>
      <input className={classNames({
        'jui-circle': true,
        disabled: disabled
      })} type="radio" id={localId} name={name} value={value} checked={checked} disabled={disabled} onChange={() => handleClick()}></input>
      <label className={classNames({
        'jui-label': true,
        disabled: disabled,
        hightlight: hightlight
      })} htmlFor={name} onClick={() => handleClick()}>{text}</label>
    </div>
  )
}

export default Radio
