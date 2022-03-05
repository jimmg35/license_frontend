import React, { useEffect, useState } from 'react'
import CurcularItem from './CircularItem'

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'determinate' | 'indeterminate',
    radius?: number,
    stroke?: number,
    progress?: number
}

const CircularProgress = ({
  radius = 40,
  stroke = 4,
  progress = 0,
  variant = 'indeterminate',
  className
}: CircularProgressProps) => {
  let timer: number
  const [counter, setcounter] = useState(0)
  useEffect(() => {
    if (variant === 'determinate') {
      clearInterval(timer)
    }
  }, [variant])
  useEffect(() => {
    if (variant === 'indeterminate') {
      timer = window.setInterval(() => {
        setcounter(prev => prev + 2)
      }, 10)
    }
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
      <div className={className}>
          <CurcularItem
            radius={ radius }
            stroke={ stroke }
            progress={ variant === 'indeterminate' ? counter : progress }
            />
      </div>
  )
}

export default CircularProgress
