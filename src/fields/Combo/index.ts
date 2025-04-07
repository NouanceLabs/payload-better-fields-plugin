import { deepMerge, type Field, type TextField } from 'payload'

import { beforeValidate } from './beforeValidate.js'

export type Config = {
  // commented out for now until we can find a better pattern
  // callback?: (value: string) => Promise<string> | string
  initial?: string
  separator?: string
}

type Combo = (
  /**
   * Field overrides
   */
  overrides: Omit<TextField, 'type'>,
  /**
   * An array of string mapping the field path names, nested fields are supported here
   * @default {string[]} ['title']
   */
  fieldToUse: string[],
  /**
   * Additional configuration for processing the value
   * @default { separator: ' ' }
   */
  options?: Config,
) => Field[]

export const ComboField: Combo = (
  overrides,
  fieldToUse: string[],
  options: Config = { initial: '', separator: ' ' },
) => {
  const comboField = deepMerge<TextField, Omit<TextField, 'type'>>(
    {
      name: 'combo',
      type: 'text',
      admin: {
        components: {
          Field: {
            clientProps: {
              config: {
                options: {
                  initial: options.initial,
                  separator: options.separator,
                },
                watchFields: fieldToUse,
              },
            },
            path: '@nouance/payload-better-fields-plugin/Combo#ComboComponent',
          },
        },
      },
      hooks: {
        beforeValidate: [beforeValidate(fieldToUse, options)],
      },
    },
    overrides,
  )

  const fields = [comboField]

  return fields
}
