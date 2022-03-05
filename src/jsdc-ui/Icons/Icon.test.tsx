import React from 'react'
import ReactDOM from 'react-dom'
import { render, screen } from '@testing-library/react'
import Icon, { IIconProps } from './Icon'
import IconAssetMap, { IconAssetKeyType } from './IconAssetMap'
import '@testing-library/jest-dom/extend-expect'

describe('jui-UI Icon component', () => {
  test('icon component has svg element', async () => {
    const iconType = 'menu'
    const target = render(<Icon type={iconType}/>)

    const getSVGElemByKey = async (key: IconAssetKeyType) => {
      return (await import(`./svg/${IconAssetMap[key]}`)).ReactComponent.render()
    }
    const svgComponent = await getSVGElemByKey(iconType)
    expect(svgComponent.type).toBe('svg')
    expect(svgComponent.props.children).toBeTruthy()
    expect(target).toBeTruthy()
  })

  test('icon component sm size props', async () => {
    const props: IIconProps = {
      type: 'menu'
    }
    const target = render(<Icon { ...props }/>)
    const iconElem = (await target.findByTestId('test-icon'))
    expect(iconElem).toHaveClass(props.size as string)
  })
})
