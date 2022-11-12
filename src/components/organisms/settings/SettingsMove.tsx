import { Icon } from '~components/atoms'
import { IModuleProps, Module } from '~components/core'

export const SettingsMove: React.FC<IModuleProps> = (props) => (
  <Module
    Icon={<Icon src={require(`~assets/icons/settings/move.svg`)} />}
    {...props}
  />
)
