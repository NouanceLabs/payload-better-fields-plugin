import type { Field, NumberField as NumberFieldType } from 'payload'
import type { NumericFormatProps } from 'react-number-format'
import type { PartialRequired } from 'src/types.js'

import { deepMerge } from 'payload'

type FieldTypes = NumberFieldType

interface NumericConfig extends NumericFormatProps {}

export type Config = {} & NumericConfig

type Number = (
  /**
   * Field overrides
   */
  overrides: Omit<FieldTypes, 'type'>,
  /**
   * Config mapping to Numeric or Pattern formats from https://s-yadav.github.io/react-number-format/docs/numeric_format
   */
  config: Config,
) => Field[]

export const NumberField: Number = (overrides, config) => {
  const numberField = deepMerge<FieldTypes, Omit<FieldTypes, 'type'>>(
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
        components: {
          Field: {
            clientProps: {
              config,
            },
            path: '@nouance/payload-better-fields-plugin/Number#NumberComponent',
          },
        },
        readOnly: config.readOnly,
      },
    },
    overrides,
  )

  const fields = [numberField]

  return fields
}
