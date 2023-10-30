import { Field } from 'payload/types'
import Component from './Component'
import { TextField } from 'payload/dist/fields/config/types'
import { PartialRequired } from '../../utilities/partialRequired'
import deepMerge from '../../utilities/deepMerge'

/* export const validateHexColor = (value: string = ''): true | string => {
  return value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/) !== null || `Please give a valid hex color`
} */

export type Config = {
  type: 'hex' | 'hexA' | 'rgb' | 'rgbA' | 'hsl' | 'hslA'
  mode?: 'button' | 'expanded' | 'modal'
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
      mode: 'button',
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
