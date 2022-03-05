import React from 'react'
import { render, screen } from '@testing-library/react'
import CurcularItem from './CircularItem'

test('renders learn react link', () => {
  render(<CurcularItem />)
  const svg = screen.getByTestId('cir')
  expect(svg).toBeInTheDocument()
})
