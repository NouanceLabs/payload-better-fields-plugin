import type { Field, TextField } from 'payload'

import { deepMerge, deepMergeSimple } from 'payload'

export type PartialRequired<T, K extends keyof T> = Partial<T> & Pick<T, K>

export type Config = {
  expanded?: boolean
  showPreview?: boolean
  type: 'hex' | 'hexA' | 'hsl' | 'hslA' | 'rgb' | 'rgbA'
}

type ColourPicker = (
  /**
   * Overrides for the underlying Text field from Payload
   */
  overrides: PartialRequired<TextField, 'name'>,
  config?: Config,
) => Field[]

export const ColourPickerField: ColourPicker = (overrides, config = { type: 'hex' }) => {
  const configWithDefaults = deepMergeSimple<Config>(
    {
      type: 'hex',
      expanded: false,
      showPreview: false,
    },
    config,
  )

  const colourPickerField = deepMerge<TextField, Partial<TextField>>(
    {
      name: 'ColourPickerField',
      type: 'text',
      admin: {
        components: {
          Field: {
            clientProps: configWithDefaults,
            path: '@nouance/payload-better-fields-plugin/ColourPicker#ColourPickerComponent',
          },
        },
      },
    },
    overrides,
  )

  const fields = [colourPickerField]

  return fields
}
