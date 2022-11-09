import { Icon } from '~components/atoms'
import { IModuleProps, Module } from '~components/layouts'

export const MouseJoystick: React.FC<IModuleProps> = (props) => (
  <Module
    Icon={<Icon src={require(`~assets/icons/joystick.svg`)} />}
    {...props}
  />
)
