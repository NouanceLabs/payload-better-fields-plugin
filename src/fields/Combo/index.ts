import type { PartialRequired } from 'src/types.js'

import { deepMerge, type Field, type TextField } from 'payload'

import { beforeValidate } from './beforeValidate.js'

export type Config = {
  callback?: (value: string) => Promise<string> | string
  initial?: string
  separator?: string
}

type Combo = (
  /**
   * Field overrides
   */
  overrides: PartialRequired<TextField, 'name'>,
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
  const comboField = deepMerge<TextField, Partial<TextField>>(
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
