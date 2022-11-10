import { Box, BoxProps, Typography } from '@mui/material'
import { keyframes } from '@mui/system'

interface ICoordinateMapProps extends BoxProps {
  coords: [number, number]
  activeCoord: [number, number]
}

interface ICoordinateContainer extends BoxProps {
  variant: 'x' | 'y'
}

interface ICoordinate extends BoxProps {
  variant: 'x' | 'y'
  index: number
  size: number
  isActive: boolean
  isFirst: boolean
  isLast: boolean
}

const loadingCoord = keyframes`
  from { max-width: 0; max-height: 0; }
  to {  max-width: 100vw; max-height: 100vh; }
`

export const CoordinateMap: React.FC<ICoordinateMapProps> = ({
  coords: [coordsX, coordsY],
  activeCoord: [activeCoordX, activeCoordY],
  ...props
}) => (
  <Box width="100vw" height="100vh" position="fixed" {...props}>
    <CoordinateContainer variant="x">
      {Array.from({ length: coordsX }, (_, index) => (
        <Coordinate
          key={index}
          variant="x"
          isFirst={index === 0}
          isLast={index === coordsX - 1}
          isActive={index === activeCoordX}
          size={100 * (activeCoordY / (coordsY - 1))}
          index={index}
        />
      ))}
    </CoordinateContainer>

    <CoordinateContainer variant="y">
      {Array.from({ length: coordsY }, (_, index) => (
        <Coordinate
          key={index}
          variant="y"
          isFirst={index === 0}
          isLast={index === coordsY - 1}
          isActive={index === activeCoordY}
          size={100 * (activeCoordX / (coordsX - 1))}
          index={index}
        />
      ))}
    </CoordinateContainer>
  </Box>
)

export const CoordinateContainer: React.FC<ICoordinateContainer> = ({
  variant,
  ...props
}) => (
  <Box
    width="100%"
    height="100%"
    position="absolute"
    display="flex"
    flexDirection={variant === 'x' ? 'column' : 'row'}
    justifyContent="space-between"
    {...props}
  />
)

export const Coordinate: React.FC<ICoordinate> = ({
  variant,
  index,
  isFirst,
  isLast,
  isActive,
  size,
  ...props
}) => {
  return variant === 'x' ? (
    <Box
      width="100%"
      height="2px"
      bgcolor="secondary.900"
      border="1px solid"
      color="primary.900"
      display="flex"
      alignItems="center"
      position="relative"
      {...props}>
      <Typography
        borderRadius={10}
        px={1}
        bgcolor={isActive ? 'primary.900' : 'secondary.900'}
        color={isActive ? 'secondary.900' : 'primary.900'}
        border="2px solid"
        zIndex={isActive ? 2 : 1}
        sx={{
          transform: `translateY(${isFirst ? '125%' : isLast ? '-50%' : 0})`,
        }}>
        {index}X
      </Typography>
      <Box
        id={`muveCoordinateX${index}`}
        width={isActive ? `${size}%` : 0}
        height="2px"
        bgcolor="red"
        position="absolute"
        sx={{ animation: `${loadingCoord} 1s ease` }}
      />
    </Box>
  ) : (
    <Box
      width="2px"
      height="100%"
      bgcolor="secondary.900"
      border="1px solid"
      color="primary.900"
      display="flex"
      justifyContent="center"
      position="relative"
      {...props}>
      <Typography
        height="fit-content"
        borderRadius={10}
        px={1}
        bgcolor={isActive ? 'primary.900' : 'secondary.900'}
        color={isActive ? 'secondary.900' : 'primary.900'}
        border="2px solid"
        zIndex={isActive ? 2 : 1}
        sx={{
          transform: `translateX(${isFirst ? '125%' : isLast ? '-50%' : 0})`,
        }}>
        {index}Y
      </Typography>
      <Box
        id={`muveCoordinateY${index}`}
        width="2px"
        height={isActive ? `${size}%` : 0}
        bgcolor="red"
        position="absolute"
        sx={{ animation: `${loadingCoord} 1s ease` }}
      />
    </Box>
  )
}
