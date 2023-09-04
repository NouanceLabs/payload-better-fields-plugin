import type { Field } from 'payload/types'
import deepMerge from '../../utilities/deepMerge'
import PatternComponent from './PatternComponent'
import { TextField as TextFieldType } from 'payload/types'
import { PartialRequired } from '../../utilities/partialRequired'
import { PatternFormatProps } from 'react-number-format'

type FieldTypes = TextFieldType

export interface PatternConfig extends PatternFormatProps {
  callback?: (value: string) => string
}

export type Config = PatternConfig & {}

type Pattern = (
  /**
   * Config mapping to Numeric or Pattern formats from https://s-yadav.github.io/react-number-format/docs/numeric_format
   */
  format: Config,
  /**
   * Field overrides
   */
  overrides: PartialRequired<FieldTypes, 'name'>,
) => Field[]

export const PatternField: Pattern = (format, overrides) => {
  const patternField = deepMerge<FieldTypes, Partial<FieldTypes>>(
    {
      name: 'pattern',
      type: 'text',
      required: format.required,
      admin: {
        readOnly: format.readOnly,
        components: {
          Field: PatternComponent,
        },
      },
      custom: {
        format: format,
      },
    },
    overrides,
  )

  const fields = [patternField]

  return fields
}
