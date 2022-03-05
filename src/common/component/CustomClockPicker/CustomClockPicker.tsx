import React, { useState } from 'react'
import { ClockPicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { TextField, Card } from '@mui/material'

const CustomClockPicker = () => {
  const [open, setopen] = useState(false)
  return (
    <div>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" onClick={() => { setopen(prev => !prev) }} />

      {
        !open ||
        <Card>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ClockPicker date={new Date()} onChange={(newDate) => console.log(newDate)} />
          </LocalizationProvider>
        </Card>
      }

    </div>
  )
}

export default CustomClockPicker
