import { Grid, GridProps } from '@mui/material'
import { useContext, useEffect, useState } from 'react'

import { MouseControlContext, TrackingCursorContext } from '~context'

interface IMuveGridProps extends GridProps {
  Menu: React.ElementType
  ActiveModule: React.ElementType
  RecentModules: React.ElementType[]
}

export const MuveGrid: React.FC<IMuveGridProps> = ({
  Menu,
  ActiveModule,
  RecentModules,
  ...props
}) => {
  const { activeModule } = useContext(MouseControlContext)
  const [isHovering, setIsHovering] = useState(true)
  const [isHoveringId, setIsHoveringId] = useState<NodeJS.Timeout>(null)

  const activeArea = 'b2'
  const recentAreas = ['a2', 'b3', 'c2', 'b1']
  const menuAreas = ['a1', 'a3', 'c1', 'c3']
  const recentAreaToVariant = {
    a2: 'horizontal',
    b3: 'vertical',
    c2: 'horizontal',
    b1: 'vertical',
  }

  const handleMouseEnter = () => {
    // clearTimeout(isHoveringId)
    // setIsHovering(true)
    // console.log('handleMouseEnter')
  }

  const handleMouseLeave = () => {
    // const timeId = setTimeout(() => setIsHovering(false), 30000)
    // setIsHoveringId(timeId)
    // console.log('handleMouseLeave')
  }

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
      tracking-event="true"
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

      {RecentModules.map((Module, index) => {
        const area = recentAreas[index]
        return (
          <Grid item key={area} gridArea={area} position="relative">
            <Module
              variant={recentAreaToVariant[area]}
              onClick={() => activeModule(Module)}
            />
          </Grid>
        )
      })}

      <Grid item gridArea={activeArea} position="relative">
        <ActiveModule variant="active" />
      </Grid>
    </Grid>
  )
}
