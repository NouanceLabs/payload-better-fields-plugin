import type { Field, UIField } from 'payload'

import { deepMerge } from 'payload'

export type PartialRequired<T, K extends keyof T> = Partial<T> & Pick<T, K>

type CustomAlertBox = {
  message: never
  type: 'custom'
}

export type BaseConfig = {
  message: string
  type: 'alert' | 'error' | 'info'
}

export type Config = {
  className?: string
  icon?: {
    enable?: boolean
  }
} & BaseConfig

type AlertBox = (overrides: {
  /**
   * Config for the alert box.
   * Type defaults to 'info'
   */
  config: Config
  /**
   * Field overrides
   */
  overrides: PartialRequired<UIField, 'name'>
}) => Field[]

export const AlertBoxField: AlertBox = ({ config, overrides }) => {
  const alertBoxField = deepMerge<UIField, Partial<UIField>>(
    {
      name: 'AlertBox',
      type: 'ui',
      admin: {
        components: {
          Field: {
            clientProps: {
              ...config,
              icon: {
                enable: true,
                ...config.icon,
              },
            },
            path: '@nouance/payload-better-fields-plugin/AlertBox#AlertBoxComponent',
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
    },
    overrides,
  )

  const fields = [alertBoxField]

  return fields
}
