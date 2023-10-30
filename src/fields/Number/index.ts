import type { Field } from 'payload/types'
import deepMerge from '../../utilities/deepMerge'
import NumericComponent from './NumericComponent'
import { NumberField as NumberFieldType } from 'payload/types'
import { PartialRequired } from '../../utilities/partialRequired'
import { NumericFormatProps, PatternFormatProps } from 'react-number-format'

type FieldTypes = NumberFieldType

export interface NumericConfig extends NumericFormatProps {
  callback?: (value: string) => number
}

export type Config = NumericConfig & {}

type Number = (
  /**
   * Field overrides
   */
  overrides: PartialRequired<FieldTypes, 'name'>,
  /**
   * Config mapping to Numeric or Pattern formats from https://s-yadav.github.io/react-number-format/docs/numeric_format
   */
  config: Config,
) => Field[]

export const NumberField: Number = (overrides, config) => {
  const numberField = deepMerge<FieldTypes, Partial<FieldTypes>>(
    {
      name: 'number',
      type: 'number',
      required: config.required,
      ...(config?.min
        ? {
            min: typeof config.min === 'string' ? parseInt(config.min) : config.min,
          }
        : {}),
      ...(config?.max
        ? {
            max: typeof config.max === 'string' ? parseInt(config.max) : config.max,
          }
        : {}),
      admin: {
        readOnly: config.readOnly,
        components: {
          Field: NumericComponent,
        },
      },
      custom: {
        config: config,
      },
    },
    overrides,
  )

  const fields = [numberField]

  return fields
}
