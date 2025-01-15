import type { Field } from 'payload/types'
import {deepMerge} from '../../utilities/deepMerge'
import Component from './Component'
import { TextField } from 'payload/types'
import validate from './validate'
import { PartialRequired } from '../../utilities/partialRequired'

export type Config = {}

type ColourText = (
  /**
   * Field overrides
   */
  overrides: PartialRequired<TextField, 'name'>,
) => Field[]

export const ColourTextField: ColourText = overrides => {
  const colourTextField = deepMerge<TextField, Partial<TextField>>(
    {
      name: 'colourText',
      type: 'text',
      validate: validate(overrides.required),
      admin: {
        components: {
          Field: Component,
        },
      },
    },
    overrides,
  )

  const fields = [colourTextField]

  return fields
}
