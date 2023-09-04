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
   * Config mapping to Numeric or Pattern formats from https://s-yadav.github.io/react-number-format/docs/numeric_format
   */
  format: Config,
  /**
   * Field overrides
   */
  overrides: PartialRequired<FieldTypes, 'name'>,
) => Field[]

export const NumberField: Number = (format, overrides) => {
  const numberField = deepMerge<FieldTypes, Partial<FieldTypes>>(
    {
      name: 'number',
      type: 'number',
      required: format.required,
      ...('type' in overrides && overrides.type === 'number'
        ? {
            ...(format?.min
              ? {
                  min: typeof format.min === 'string' ? parseInt(format.min) : format.min,
                }
              : {}),
            ...(format?.max
              ? {
                  max: typeof format.max === 'string' ? parseInt(format.max) : format.max,
                }
              : {}),
          }
        : {}),
      admin: {
        readOnly: format.readOnly,
        components: {
          Field: NumericComponent,
        },
      },
      custom: {
        format: format,
      },
    },
    overrides,
  )

  const fields = [numberField]

  return fields
}
