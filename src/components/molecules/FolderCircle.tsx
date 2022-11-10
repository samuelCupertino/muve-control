import { Box, BoxProps, Zoom } from '@mui/material'
import type React from 'react'
import { useState } from 'react'

import { Icon } from '~components/atoms'

interface IFolderCircleItem {
  iconSrc: string
  onClick?: () => void
}

interface IFolderCircleProps extends BoxProps {
  items: [IFolderCircleItem, IFolderCircleItem, IFolderCircleItem]
}

export const FolderCircle: React.FC<IFolderCircleProps> = ({
  items,
  ...props
}) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Box
      width="100%"
      height="100%"
      borderRadius="50%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      tracking-event="true"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}>
      <Zoom
        in={!isHovering}
        style={{ transitionDuration: '1s' }}
        timeout={1000}>
        <Box
          width="60%"
          height="60%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="50%"
          border="2px solid"
          borderColor="primary.500"
          bgcolor="secondary.500">
          <Zoom
            in={!isHovering}
            style={{ transitionDuration: '0.5s', transitionDelay: '1s' }}>
            <Box>
              <Icon src={require(`~assets/icons/folder.svg`)} />
            </Box>
          </Zoom>
        </Box>
      </Zoom>

      <Zoom in={isHovering} style={{ transitionDuration: '1s' }} timeout={1000}>
        <Box
          width="90%"
          height="90%"
          borderRadius="50%"
          border="2px solid"
          borderColor="primary.500"
          bgcolor="secondary.500"
          position="absolute"
          overflow="hidden"
          tracking-event="true">
          <Box
            width="75%"
            height="75%"
            borderRadius="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="absolute"
            top="-20%"
            left="15%"
            tracking-event="true"
            onClick={items[0].onClick}>
            <Icon src={items[0].iconSrc} ml={0} mt={2} />
          </Box>
          <Box
            width="75%"
            height="75%"
            borderRadius="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="absolute"
            top="35%"
            left="50%"
            tracking-event="true"
            onClick={items[1].onClick}>
            <Icon src={items[1].iconSrc} ml={-3.5} mt={-3.5} />
          </Box>
          <Box
            width="75%"
            height="75%"
            borderRadius="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="absolute"
            top="35%"
            left="-15%"
            tracking-event="true"
            onClick={items[2].onClick}>
            <Icon src={items[2].iconSrc} ml={2} mt={-3} />
          </Box>
        </Box>
      </Zoom>
    </Box>
  )
}
