import type { Field, TextField as TextFieldType } from 'payload'
import type { PatternFormatProps } from 'react-number-format'

import { deepMerge } from 'payload'

type FieldTypes = TextFieldType

export interface PatternConfig extends PatternFormatProps {}

export type Config = {} & PatternConfig

type Pattern = (
  /**
   * Field overrides
   */
  overrides: FieldTypes,
  /**
   * Config mapping to Numeric or Pattern formats from https://s-yadav.github.io/react-number-format/docs/numeric_format
   */
  config: Config,
) => Field[]

export const PatternField: Pattern = (overrides, config) => {
  const patternField = deepMerge<FieldTypes, FieldTypes>(
    {
      name: 'pattern',
      type: 'text',
      admin: {
        components: {
          // Field: PatternComponent,
          Field: {
            clientProps: {
              config,
            },
            path: '@nouance/payload-better-fields-plugin/Pattern/client#PatternComponent',
          },
        },
        readOnly: config.readOnly,
      },

      required: config.required,
    },
    overrides,
  )

  const fields = [patternField]

  return fields
}
