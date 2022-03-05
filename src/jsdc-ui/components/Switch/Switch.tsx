import React, { useRef } from 'react'
import './Switch.scss'
import { ICheckBoxProps } from '../CheckBox/CheckBox'
import classNames from 'classnames'

export interface ISwitchProps extends ICheckBoxProps {
  // id? : string
  // text? : string
  // name? : string
  // value? : any
  // checked? : boolean
  // disabled? : boolean
  // onChange? : (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Switch = ({
  text,
  name,
  value,
  checked,
  disabled = false,
  onChange
}: ISwitchProps) => {
  const inputref = useRef() as React.MutableRefObject<HTMLInputElement>
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange !== undefined) {
      if (!disabled) {
        onChange(e)
      }
    }
  }
  return (
    <div className="jui-switch-root">
      <label className="jui-switch">
        <input ref={inputref} type="checkbox" name={name} disabled={disabled} value={value} checked={checked} onChange={(e) => handleClick(e)}/>
        <span className="slider"></span>
      </label>
      <span className={classNames({
        'jui-label': true,
        disabled: disabled
      })} onClick={() => inputref.current.click()}>{ text }</span>
    </div>
  )
}

export default Switch
