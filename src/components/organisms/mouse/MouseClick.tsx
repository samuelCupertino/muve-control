import { Icon } from '~components/atoms'
import { IModuleProps, Module } from '~components/core'

export const MouseClick: React.FC<IModuleProps> = (props) => (
  <Module
    Icon={<Icon src={require(`~assets/icons/mouse/mouse.svg`)} />}
    {...props}
  />
)
