import type { Field } from 'payload/types'
import deepMerge from '../../utilities/deepMerge'
import Component from './Component'
import type { UIField } from 'payload/types'
import type { PartialRequired } from '../../utilities/partialRequired'
import type { ComponentType } from 'react'

type CustomAlertBox = {
  type: 'custom'
  Content: ComponentType
}

export type BaseConfig = {
  type: 'info' | 'alert' | 'error'
  message: string
}

export type Config = (BaseConfig | CustomAlertBox) & {
  className?: string
  icon?: {
    enable?: boolean
    Element?: ComponentType
  }
}

type AlertBox = (
  /**
   * Field overrides
   */
  overrides: PartialRequired<UIField, 'name'>,
  /**
   * Config for the alert box.
   * Type defaults to 'info'
   */
  config: Config,
) => Field[]

export const AlertBoxField: AlertBox = (overrides, config) => {
  const alertBoxField = deepMerge<UIField, Partial<UIField>>(
    {
      name: 'AlertBox',
      type: 'ui',
      admin: {
        components: {
          Field: Component,
        },
      },
      custom: {
        ...config,
        icon: {
          enable: true,
          ...config.icon,
        },
      },
    },
    overrides,
  )

  const fields = [alertBoxField]

  return fields
}
