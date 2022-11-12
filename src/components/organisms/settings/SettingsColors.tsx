import { Icon } from '~components/atoms'
import { IModuleProps, Module } from '~components/core'

export const SettingsColors: React.FC<IModuleProps> = (props) => (
  <Module
    Icon={<Icon src={require(`~assets/icons/settings/colors.svg`)} />}
    {...props}
  />
)
