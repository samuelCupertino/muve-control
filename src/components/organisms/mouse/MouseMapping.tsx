import { useEffect } from 'react'

import { Icon } from '~components/atoms'
import { IModuleProps, Module } from '~components/layouts'

export const MouseMapping: React.FC<IModuleProps> = (props) => {
  useEffect(() => {
    if (props.variant !== 'active') return

    console.log('MouseMapping', props)
  }, [props.variant])

  return (
    <Module
      Icon={<Icon src={require(`~assets/icons/mapping.svg`)} size={22} />}
      Content={'ola'}
      {...props}
    />
  )
}
