import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CheckBox from './CheckBox'

describe('jui-UI CheckBox component', () => {
  test('CheckBox component checked status change when click on checkbox and label element', async () => {
    let checked = true
    const target = render(<CheckBox checked={checked} onChange={() => checked = !checked}/>)
    const inputElem = (await target.findByTestId('checkInput')) as HTMLInputElement
    const labelElem = (await target.findByTestId('checkLabel'))

    expect(inputElem.checked).toBe(true)

    fireEvent.click(inputElem)
    expect(inputElem.checked).toBe(false)

    fireEvent.click(labelElem)
    expect(inputElem.checked).toBe(true)
  })
})
