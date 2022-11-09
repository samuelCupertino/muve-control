import { Icon } from '~components/atoms'
import { IModuleProps, Module } from '~components/layouts'

export const MouseTracking: React.FC<IModuleProps> = (props) => (
  <Module
    Icon={<Icon src={require(`~assets/icons/tracking.svg`)} size={38} />}
    {...props}
  />
)
