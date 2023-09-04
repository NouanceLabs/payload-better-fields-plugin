import type { Field } from 'payload/types'
import deepMerge from '../../utilities/deepMerge'
import NumericComponent from './NumericComponent'
import PatternComponent from './PatternComponent'
import { TextField as TextFieldType, NumberField as NumberFieldType } from 'payload/types'
import beforeValidate from './beforeValidate'
import { PartialRequired } from '../../utilities/partialRequired'
import { NumericFormatProps, PatternFormatProps } from 'react-number-format'

type FieldTypes = NumberFieldType | TextFieldType

export interface NumericConfig extends NumericFormatProps {
  component: 'numeric'
}

export interface PatternConfig extends PatternFormatProps {
  component: 'pattern'
}

export type Config = NumericConfig | PatternConfig

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
          ...(format.component === 'numeric'
            ? {
                Field: NumericComponent,
              }
            : {
                Field: PatternComponent,
              }),
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
