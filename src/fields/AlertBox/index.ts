import type { Field, UIField } from 'payload'

import { deepMerge } from 'payload'

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

interface BetterUIField extends Omit<UIField, 'admin' | 'type'> {
  admin?: UIField['admin']
}

type AlertBox = (overrides: {
  /**
   * Config for the alert box.
   * Type defaults to 'info'
   */
  config: Config
  /**
   * Field overrides
   */
  overrides: BetterUIField
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
            path: '@nouance/payload-better-fields-plugin/AlertBox/client#AlertBoxComponent',
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
