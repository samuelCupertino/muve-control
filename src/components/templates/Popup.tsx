import { Box, FormControlLabel, Switch } from '@mui/material'
import type React from 'react'

import { useStorage } from '@plasmohq/storage/hook'

export const Popup: React.FC = () => {
  const [isMuveActive, setIsMuveActive] =
    useStorage<boolean>('muve.isMuveActive')
  const [isMuveTracking, setIsMuveTracking] = useStorage<boolean>(
    'muve.isMuveTracking',
  )

  return (
    <Box width={200} bgcolor="primary.100" borderRadius={1} px={2} py={1}>
      <FormControlLabel
        control={
          <Switch
            checked={isMuveActive}
            onChange={() => setIsMuveActive(!isMuveActive)}
          />
        }
        label="Active Muve"
      />
      <FormControlLabel
        control={
          <Switch
            checked={isMuveTracking}
            onChange={() => setIsMuveTracking(!isMuveTracking)}
          />
        }
        label="Active Tracking"
      />
    </Box>
  )
}
