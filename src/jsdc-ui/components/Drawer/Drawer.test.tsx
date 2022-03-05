import React from 'react'
import { render, queryByTestId, queryByText } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Drawer, { IDrawerProps } from './Drawer'

describe('GIAP-UI Drawer component', () => {
  test('if child component display', async () => {
    let open = true
    const { container } = render(<Drawer open={open} onClose={() => open = !open}><div>mtfk</div></Drawer>)
    expect(queryByText(container, 'mtfk')).toBeTruthy()
  })

  test('if block is displayed based on props', async () => {
    const props: IDrawerProps = {
      open: true,
      onClose: () => props.open = !props.open,
      withBlock: false
    }
    const { container, rerender } = render(<Drawer { ...props }><div>mtfk</div></Drawer>)
    const getBlockerElem = () => queryByTestId(container, /blocker/i)
    expect(getBlockerElem()).toBeNull()

    props.withBlock = true
    rerender(<Drawer { ...props }><div>mtfk</div></Drawer>)
    expect(getBlockerElem()).toBeTruthy()
  })

  test('if class giap-drawer-hide apply when drawer closed', async () => {
    const props: IDrawerProps = {
      open: true,
      onClose: () => props.open = !props.open,
      withBlock: false
    }
    const { container, rerender } = render(<Drawer { ...props }><div>mtfk</div></Drawer>)
    const drawerElem = queryByTestId(container, /drawer/i)
    expect(drawerElem).toHaveClass('giap-drawer')

    props.open = false
    rerender(<Drawer { ...props }><div>mtfk</div></Drawer>)
    expect(drawerElem).toHaveClass('giap-drawer-hide')
  })

  test('if title show', async () => {
    const props: IDrawerProps = {
      open: true,
      onClose: () => props.open = !props.open,
      title: 'f the title'
    }
    const { container } = render(<Drawer { ...props }><div>mtfk</div></Drawer>)
    const titleElem = queryByText(container, new RegExp(String(props.title)))
    expect(titleElem).toBeTruthy()
  })

  test('if style changed by anchor', async () => {
    const props: IDrawerProps = {
      open: true,
      onClose: () => props.open = !props.open,
      anchor: 'bottom'
    }
    const { container, rerender } = render(<Drawer { ...props }><div>mtfk</div></Drawer>)
    const drawerElem = queryByTestId(container, /drawer/i)
    expect(drawerElem).toHaveClass(props.anchor as string)

    props.anchor = 'left'
    rerender(<Drawer { ...props }><div>mtfk</div></Drawer>)
    expect(drawerElem).toHaveClass(props.anchor as string)

    props.anchor = 'top'
    rerender(<Drawer { ...props }><div>mtfk</div></Drawer>)
    expect(drawerElem).toHaveClass(props.anchor as string)

    props.anchor = 'right'
    rerender(<Drawer { ...props }><div>mtfk</div></Drawer>)
    expect(drawerElem).toHaveClass(props.anchor as string)
  })
})
