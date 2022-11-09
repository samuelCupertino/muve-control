import { Box, BoxProps } from '@mui/material'

interface IIconProps extends BoxProps {
  src: string
  size?: number
}

export const Icon: React.FC<IIconProps> = ({ src, size = 25, ...props }) => {
  const iconName = src.replace(/chrome-extension:\/\/[a-z]+\/(\w+).+/, '$1')

  return (
    <Box display="inline-flex" {...props}>
      <img src={src} alt={`${iconName} icon`} width={size} height={size} />
    </Box>
  )
}
