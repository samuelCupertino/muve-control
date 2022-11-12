import { Grid, GridProps } from '@mui/material'
import { useContext, useEffect, useState } from 'react'

import {
  IModuleItem,
  MouseControlContext,
  TrackingCursorContext,
} from '~context'

interface IMuveGridProps extends GridProps {
  Menu: React.ElementType
  modules: IModuleItem[]
  activatedModuleId: number
  activeModuleById: (id: number) => void
}

export const MuveGrid: React.FC<IMuveGridProps> = ({
  Menu,
  modules,
  activatedModuleId,
  activeModuleById,
  ...props
}) => {
  const gridModules = modules.slice(0, 5)
  const { isUnderControl } = useContext(TrackingCursorContext)
  const [isHovering, setIsHovering] = useState(true)
  const [isHoveringTimeId, setIsHoveringTimeId] = useState(null)

  const menuAreas = ['a1', 'a3', 'c1', 'c3']
  const moduleAres = ['b2', 'a2', 'b3', 'c2', 'b1']
  const recentAreaToVariant = {
    b2: 'active',
    a2: 'horizontal',
    b3: 'vertical',
    c2: 'horizontal',
    b1: 'vertical',
  }

  const handleMouseEnter = () => {
    clearTimeout(isHoveringTimeId)
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    const timeId = setTimeout(
      () => !isUnderControl && setIsHovering(false),
      3000,
    )
    setIsHoveringTimeId(timeId)
  }

  useEffect(() => setIsHovering(isUnderControl), [isUnderControl])

  return (
    <Grid
      display="grid"
      container
      gridTemplateAreas="'a1 a2 a3' 'b1 b2 b3' 'c1 c2 c3'"
      gridTemplateColumns="repeat(3, 150px)"
      gridTemplateRows="repeat(3, 150px)"
      gap={1}
      position="fixed"
      width="auto"
      height="auto"
      left="calc(50% - (150px * 3 / 2))"
      top="calc(50% - (150px * 3 / 2))"
      bgcolor={isHovering ? 'transparent' : 'primary.500'}
      border={isHovering ? '0px' : '5px solid'}
      borderColor={isHovering ? 'transparent' : 'secondary.500'}
      borderRadius={isHovering ? 0 : 15}
      sx={{ transform: `scale(${isHovering ? 1 : 0.25})`, transition: '1s' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}>
      {menuAreas.map((area) => (
        <Grid
          item
          key={area}
          gridArea={area}
          position="relative"
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center">
          <Menu />
        </Grid>
      ))}

      {gridModules.map(({ id, component: Module }, index) => {
        const area = moduleAres[index]
        return (
          <Grid item key={area} gridArea={area} position="relative">
            <Module
              moduleId={id}
              activatedModuleId={activatedModuleId}
              variant={recentAreaToVariant[area]}
              onClick={() => activeModuleById(id)}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
