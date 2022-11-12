import { Box, BoxProps, Zoom } from '@mui/material'
import { keyframes } from '@mui/system'
import React, { useCallback, useEffect, useRef, useState } from 'react'

type ElementId = string
type StylePropName = string
interface IImperativeProps
  extends Record<ElementId, Record<StylePropName, any>> {}

export interface IModuleProps extends BoxProps {
  moduleId: number
  activatedModuleId: number
  Icon: React.ReactNode
  Content?: React.ReactNode
  MaxContent?: React.ReactNode
  insertHTML?: {
    Component: React.ReactNode
    isReactive?: boolean
    imperativeProps?: IImperativeProps
  }
  variant: 'horizontal' | 'vertical' | 'active'
  onClick?: () => void
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Module: React.FC<IModuleProps> = ({
  moduleId,
  activatedModuleId,
  Icon,
  Content,
  MaxContent,
  insertHTML,
  variant,
  onClick,
  ...props
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const insertedHTMLRef = useRef<HTMLElement>(null)
  const { shadowRoot } = document.getElementById('muve-shadow')
  const htmlContainerEl = shadowRoot.getElementById('plasmo-shadow-container')

  const handleActivatedModule = useCallback(() => {
    if (!insertHTML) return

    const insertedHTMLEl = shadowRoot.querySelector(
      '#plasmo-shadow-container > #muveInsertedHTML',
    )

    if (!insertedHTMLEl) {
      htmlContainerEl.insertAdjacentHTML(
        'afterbegin',
        insertedHTMLRef.current.outerHTML,
      )
      return
    }
  }, [moduleId === activatedModuleId])

  const handleDisabledModule = useCallback(() => {
    if (!insertHTML) return

    const insertedHTMLEl = shadowRoot.querySelector(
      '#plasmo-shadow-container > #muveInsertedHTML',
    )
    insertedHTMLEl?.remove()
  }, [moduleId === activatedModuleId])

  const handleUploadInsertHTML = useCallback(() => {
    if (insertHTML?.isReactive) {
      const insertedHTMLEl = shadowRoot.querySelector(
        '#plasmo-shadow-container > #muveInsertedHTML',
      )
      insertedHTMLEl.remove()

      htmlContainerEl.insertAdjacentHTML(
        'afterbegin',
        insertedHTMLRef.current.outerHTML,
      )
    }

    if (insertHTML?.imperativeProps) {
      const insertedHTMLEl = shadowRoot.querySelector(
        '#plasmo-shadow-container > #muveInsertedHTML',
      )

      Object.entries(insertHTML.imperativeProps).forEach(
        ([selector, props]) => {
          const element = insertedHTMLEl.querySelector(selector) as HTMLElement

          Object.entries(props).forEach(([prop, value], index) => {
            setTimeout(() => {
              if (typeof value === 'object') {
                return Object.assign(element[prop], value)
              }
              element[prop] = value
            }, index + 100)
          })
        },
      )
    }
  }, [insertHTML])

  useEffect(() => {
    if (moduleId !== activatedModuleId) return

    handleActivatedModule()

    return handleDisabledModule
  }, [activatedModuleId])

  useEffect(() => {
    moduleId === activatedModuleId && handleUploadInsertHTML()
  }, [insertHTML])

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
          border="2px solid"
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
            overflow="hidden"
            bgcolor="secondary.500"
            border="2px solid"
            borderColor="primary.500"
            tracking-event="true"
            onMouseEnter={() => setIsHovering(true)}>
            <Zoom
              in={!isHovering || !MaxContent}
              style={{ transitionDuration: '0.5s', transitionDelay: '1s' }}>
              <Box
                height="100%"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center">
                {Content ? (
                  Content
                ) : (
                  <Box display="flex" sx={{ zoom: 2 }}>
                    {Icon}
                  </Box>
                )}
              </Box>
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
            border="2px solid"
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
            {insertHTML.Component}
          </Box>
        </Box>
      )}
    </Box>
  )
}
