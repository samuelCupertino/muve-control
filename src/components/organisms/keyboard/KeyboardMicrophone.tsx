import { Icon } from '~components/atoms'
import { IModuleProps, Module } from '~components/layouts'

export const KeyboardMicrophone: React.FC<IModuleProps> = (props) => (
  <Module
    Icon={<Icon src={require(`~assets/icons/keyboard/microphone.svg`)} />}
    {...props}
  />
)
