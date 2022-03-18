import React, { useState } from 'react'
import './index.scss'

export interface IInput extends React.HTMLProps<HTMLInputElement> {
  value?: string
}

const Input = (props: IInput) => {
  const [cvalue, setvalue] = useState<any>('')

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setvalue(event.target.value)
    if (props.onInput) {
      props.onInput(cvalue)
    }
  }
  return (
    <input
      className='iadc-input'
      value={cvalue}
      onInput={handleInput}
    ></input>
  )
}

export default Input
