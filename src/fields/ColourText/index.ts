import type { Field, TextField } from 'payload'

import { deepMerge } from 'payload'

import { validate } from './validate.js'

export type Config = {}

type ColourText = (
  /**
   * Field overrides
   */
  overrides: Omit<TextField, 'type'>,
) => Field[]

export const ColourTextField: ColourText = (overrides) => {
  const colourTextField = deepMerge<TextField, Omit<TextField, 'type'>>(
    {
      name: 'ColourText',
      type: 'text',
      admin: {
        components: {
          Field: {
            path: '@nouance/payload-better-fields-plugin/ColourText/client#ColourTextComponent',
          },
        },
      },
      // validate: validate(overrides.required),
    },
    overrides,
  )

  const fields = [colourTextField]

  return fields
}
