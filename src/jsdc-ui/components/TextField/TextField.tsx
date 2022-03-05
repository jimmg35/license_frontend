import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { Button } from '../Button'
import './TextField.scss'

export interface ITextFieldProps extends React.HTMLProps<HTMLInputElement> {
  togglepassword?: boolean
  varient?: 'sm' | 'md' | 'larg'
  value?: string
  disabled?: boolean
}

const TextField = ({
  varient = 'md',
  togglepassword = false,
  label,
  type = 'text',
  value = '',
  disabled = false,
  onInput
}: ITextFieldProps) => {
  const [localvalue, setlocalvalue] = useState<any>('')
  const [ctrledtype, setctrledtype] = useState<string>()
  useEffect(() => {
    setctrledtype(type)
  }, [type])
  useEffect(() => {
    setlocalvalue(value)
  }, [value])

  const hasEndAction = () => {
    return togglepassword && type === 'password'
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setlocalvalue(event.target.value)
    if (onInput) {
      onInput(event)
    }
  }
  const handlePasswordToggle = () => {
    if (ctrledtype === 'password') {
      setctrledtype('text')
    } else {
      setctrledtype('password')
    }
  }
  return (
    <div className={classNames({
      'jui-textfield': true,
      disabled
    })}>
      <span className={classNames({
        'jui-label': true,
        hasText: localvalue
      })}>{label}</span>
      <div className={classNames({
        hasEndAction: hasEndAction(),
        sm: varient === 'sm',
        md: varient === 'md',
        larg: varient === 'larg',
        'jui-inputBase': true
      })}>
        <input disabled={disabled} type={ctrledtype} className='jui-input' value={localvalue} onInput={handleInputChange}/>
        <div className="jui-input-positionEnd">
          {
            hasEndAction()
              ? (
                    <Button varient='flat' onClick={() => handlePasswordToggle()} children={'T'} />
                )
              : null
          }
        </div>
      </div>
    </div>
  )
}

export default TextField
