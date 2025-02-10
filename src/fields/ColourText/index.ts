import type { Field, TextField } from 'payload'
import type { PartialRequired } from 'src/types.js'

import { deepMerge } from 'payload'

import { validate } from './validate.js'

export type Config = {}

type ColourText = (
  /**
   * Field overrides
   */
  overrides: PartialRequired<TextField, 'name'>,
) => Field[]

export const ColourTextField: ColourText = (overrides) => {
  const colourTextField = deepMerge<TextField, Partial<TextField>>(
    {
      name: 'ColourText',
      type: 'text',
      admin: {
        components: {
          Field: {
            path: '@nouance/payload-better-fields-plugin/ColourText#ColourTextComponent',
          },
        },
      },
      validate: validate(overrides.required),
    },
    overrides,
  )

  const fields = [colourTextField]

  return fields
}
