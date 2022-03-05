import React, { useEffect, useRef } from 'react'
import IconAssetMap, { IconAssetKeyType } from './IconAssetMap'
import { IPropsWithSize } from '../utils/jui-ui-interface'
import './Icon.scss'
import classNames from 'classnames'

export interface IIconProps extends IPropsWithSize {
  type: IconAssetKeyType
  light?: boolean
}

const Icon = ({
  type,
  size = 'md',
  light = false
}: IIconProps) => {
  const rootRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const getSVGElemByKey = async (key: IconAssetKeyType) => {
    const iconAsset = IconAssetMap[key]
    const assetUrl = (await import(`./svg/${iconAsset}`)).default
    const svgText = await (await fetch(assetUrl)).text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgText, 'image/svg+xml')
    return doc.firstChild
  }
  const appendSVG = async (key: IconAssetKeyType) => {
    const svg = await getSVGElemByKey(key)
    const child = rootRef.current.firstChild
    if (child) {
      child.remove()
    }
    if (svg) {
      rootRef.current.appendChild(svg)
    }
  }
  useEffect(() => {
    appendSVG(type)
  }, [type])

  return (
    <div ref={rootRef} data-testid="test-icon" className={classNames({
      'jui-icon': true,
      light,
      [size]: size
    })}>
    </div>
  )
}

export default Icon
