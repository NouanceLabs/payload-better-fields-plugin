import { Field } from 'payload/types'
import Component from './Component'
import { TextField } from 'payload/dist/fields/config/types'
import { PartialRequired } from '../../utilities/partialRequired'
import deepMerge from '../../utilities/deepMerge'

export type Config = {
  type: 'hex' | 'hexA' | 'rgb' | 'rgbA' | 'hsl' | 'hslA'
  expanded?: boolean
  showPreview?: boolean
}

type SmartColour = (
  /**
   * Slug field overrides
   */
  overrides: PartialRequired<TextField, 'name'>,
  config?: Config,
) => Field[]

export const SmartColourField: SmartColour = (overrides, config = { type: 'hex' }) => {
  const configWithDefaults = deepMerge<Config, Partial<Config>>(
    {
      type: 'hex',
      expanded: false,
      showPreview: false,
    },
    config,
  )

  const alertBoxField = deepMerge<TextField, Partial<TextField>>(
    {
      name: 'SmartColourField',
      type: 'text',
      admin: {
        components: {
          Field: Component,
        },
      },
      custom: configWithDefaults,
    },
    overrides,
  )

  const fields = [alertBoxField]

  return fields
}
