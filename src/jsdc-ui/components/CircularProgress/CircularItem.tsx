import React, { useEffect, useState } from 'react'

export type CurcularItemProps = {
  variant?: 'determinate' | 'indeterminate',
  radius?: number,
  stroke?: number,
  progress?: number
}

const CurcularItem = ({
  radius = 40,
  stroke = 4,
  progress = 0
}: CurcularItemProps) => {
  const [normalizedRadius, setnormalizedRadius] = useState(0)
  const [circumference, setcircumference] = useState(0)
  const [strokeDashoffset, setstrokeDashoffset] = useState(0)
  useEffect(() => {
    const normRadi = radius - stroke * 2
    const cirFer = normRadi * 2 * Math.PI
    const strokOff =
      cirFer - progress / 100 * cirFer
    setnormalizedRadius(normRadi)
    setcircumference(cirFer)
    setstrokeDashoffset(strokOff)
  }, [progress])

  return (
    <svg
      data-testid='cir'
      height={radius * 2}
      width={radius * 2}
    >
      <circle
        stroke='gray'
        fill='transparent'
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  )
}

export default CurcularItem
