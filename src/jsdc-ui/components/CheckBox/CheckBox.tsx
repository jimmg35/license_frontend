import classNames from 'classnames'
import React, { useState, useEffect, useRef } from 'react'
import './CheckBox.scss'
import { v4 as uuidv4 } from 'uuid'

export interface ICheckBoxProps extends React.HTMLProps<HTMLInputElement> {
  id? : string
  text? : string
  name? : string
  value? : any
  checked? : boolean
  disabled? : boolean
  // hightlight? : boolean
  // setCheck? : (checkStatus: boolean) => void
  onChange? : (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CheckBox = (props: ICheckBoxProps) => {
  const {
    id = uuidv4(),
    text = '',
    name = '',
    value = '',
    checked = false,
    disabled = false,
    onChange = undefined
  } = props

  const [localId, setlocalId] = useState('')
  const [localChecked, setlocalChecked] = useState(props.checked)
  const inputref = useRef() as React.MutableRefObject<HTMLInputElement>

  useEffect(() => {
    setlocalId(id)
  }, [])
  useEffect(() => {
    setlocalChecked(checked)
  }, [checked])

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange !== undefined) {
      if (!disabled) {
        setlocalChecked(prev => !prev)
        onChange(e)
      }
    }
  }

  return (
    <div className='jui-checkbox'>
      <input data-testid='checkInput' className={classNames({
        'jui-box': true
      })} id={localId} ref={inputref} disabled={disabled} type='checkbox' name={name} value={value} checked={localChecked} onChange={(e) => handleClick(e)}></input>
      <label data-testid='checkLabel' className={classNames({
        'jui-label': true,
        disabled: disabled
      })} htmlFor={name} onClick={() => inputref.current.click()}>{text}</label>
    </div>
  )
}

export default CheckBox
