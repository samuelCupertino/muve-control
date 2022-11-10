import { Box, BoxProps, Typography } from '@mui/material'

interface ITimeCursorProps extends BoxProps {
  coord: { x: number | string; y: number | string }
  time: number
}

export const TimeCursor: React.FC<ITimeCursorProps> = ({
  coord,
  children,
  time = children,
  ...props
}) => (
  <Box
    width={50}
    height={50}
    display="flex"
    justifyContent="center"
    alignItems="center"
    position="fixed"
    left={coord.x}
    top={coord.y}
    bgcolor="primary.500"
    border="2px solid white"
    borderRadius="0 50% 50% 50%"
    zIndex={2}
    sx={{ transform: 'translate(-50%, -50%)', transition: '0.5s' }}
    {...props}>
    <Box
      width="90%"
      height="90%"
      position="absolute"
      bgcolor="red"
      borderRadius="50%"
      zIndex={-1}
    />
    <Typography color="white" fontSize={26}>
      {time}
    </Typography>
  </Box>
)
