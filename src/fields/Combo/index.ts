import type { Field } from 'payload/types'
import deepMerge from '../../utilities/deepMerge'
import Component from './Component'
import { TextField } from 'payload/types'
import beforeValidate from './beforeValidate'
import { PartialRequired } from '../../utilities/partialRequired'

export type Config = {
  separator?: string
  callback?: (field: string) => string
  initial?: string
}

type Combo = (
  /**
   * An array of string mapping the field path names, nested fields are supported here
   * @default {string[]} ['title']
   */
  fieldToUse: string[],
  /**
   * Field overrides
   */
  overrides: PartialRequired<TextField, 'name'>,
  /**
   * Additional configuration for processing the value
   * @default { separator: ' ' }
   */
  options?: Config,
) => Field[]

export const ComboField: Combo = (
  fieldToUse: string[],
  overrides,
  options: Config = { separator: ' ', initial: '' },
) => {
  const comboField = deepMerge<TextField, Partial<TextField>>(
    {
      name: 'combo',
      type: 'text',
      hooks: {
        beforeValidate: [beforeValidate(fieldToUse, options)],
      },
      admin: {
        components: {
          Field: Component,
        },
      },
      custom: {
        watchFields: fieldToUse,
        options: options,
      },
    },
    overrides,
  )

  const fields = [comboField]

  return fields
}
