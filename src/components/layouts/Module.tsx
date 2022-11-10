import { Box, BoxProps, Zoom } from '@mui/material'
import { keyframes } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'

export interface IModuleProps extends BoxProps {
  Icon: React.ReactNode
  Content?: React.ReactNode
  MaxContent?: React.ReactNode
  insertHTML?: {
    upload: boolean
    Content: React.ReactNode
  }
  variant: 'horizontal' | 'vertical' | 'active'
  onClick?: () => void
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Module: React.FC<IModuleProps> = ({
  Icon,
  Content = Icon,
  MaxContent,
  insertHTML,
  variant = 'full',
  onClick,
  ...props
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const insertedHTMLRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!insertHTML?.upload) return

    const htmlContainerEl = document
      .getElementById('muve-shadow')
      .shadowRoot.getElementById('plasmo-shadow-container')

    const insertedHTMLEl = htmlContainerEl.querySelector(
      '* > #muveInsertedHTML',
    )
    insertedHTMLEl?.remove()

    if (variant !== 'active') return

    htmlContainerEl.insertAdjacentHTML(
      'afterbegin',
      insertedHTMLRef.current.outerHTML,
    )
  }, [insertHTML, variant])

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...props}>
      {['horizontal', 'vertical'].includes(variant) && (
        <Box
          {...(variant === 'horizontal'
            ? { width: '100%', height: '40%' }
            : { width: '40%', height: '100%' })}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="30px"
          bgcolor="secondary.500"
          border="3px solid"
          borderColor="primary.500"
          sx={{ animation: `${spin} 1s ease` }}
          tracking-event="true"
          onClick={onClick}>
          {Icon}
        </Box>
      )}

      {variant === 'active' && (
        <Zoom
          in={!isHovering || !MaxContent}
          style={{ transitionDuration: '1s' }}
          timeout={1000}>
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="10%"
            bgcolor="secondary.500"
            border="3px solid"
            borderColor="primary.500"
            tracking-event="true"
            onMouseEnter={() => setIsHovering(true)}>
            <Zoom
              in={!isHovering || !MaxContent}
              style={{ transitionDuration: '0.5s', transitionDelay: '1s' }}>
              <Box>{Content}</Box>
            </Zoom>
          </Box>
        </Zoom>
      )}

      {variant === 'active' && MaxContent && (
        <Zoom
          in={isHovering}
          style={{ transitionDuration: '1s' }}
          timeout={2000}>
          <Box
            width="300%"
            height="300%"
            display="flex"
            position="absolute"
            justifyContent="center"
            alignItems="center"
            borderRadius="10%"
            border="3px solid"
            borderColor="primary.500"
            bgcolor="secondary.900"
            tracking-event="true"
            onMouseLeave={() => setIsHovering(false)}>
            {MaxContent}
          </Box>
        </Zoom>
      )}

      {insertHTML && (
        <Box display="none">
          <Box ref={insertedHTMLRef} id="muveInsertedHTML">
            {insertHTML.Content}
          </Box>
        </Box>
      )}
    </Box>
  )
}
