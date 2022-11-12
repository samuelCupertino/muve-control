import { Icon } from '~components/atoms'
import { IModuleProps, Module } from '~components/core'

export const SettingsTracking: React.FC<IModuleProps> = (props) => (
  <Module
    Icon={<Icon src={require(`~assets/icons/settings/tracking.svg`)} />}
    {...props}
  />
)
