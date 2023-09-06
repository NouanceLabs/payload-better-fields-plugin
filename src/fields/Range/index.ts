import type { Field } from 'payload/types'
import deepMerge from '../../utilities/deepMerge'
import NumericComponent from './RangeComponent'
import { NumberField as NumberFieldType } from 'payload/types'
import { PartialRequired } from '../../utilities/partialRequired'
import { NumberMarkerItem } from '../../types'

type FieldTypes = NumberFieldType

/**
 * Additional config unique to the range input
 */
export type Config = {
  /**
   * @default 1
   */
  min?: number
  /**
   * @default 100
   */
  max?: number
  /**
   * @default 1
   */
  step?: number | 'any'
  /**
   * Shows the value previewed next to the field
   */
  showPreview?: boolean
  /**
   * You can provide an array of markers https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#adding_tick_marks
   */
  markers?: NumberMarkerItem[]
}

type Range = (
  range: Config,
  /**
   * Field overrides
   */
  overrides: Omit<PartialRequired<FieldTypes, 'name'>, 'type'>,
) => Field[]

export const RangeField: Range = (range = {}, overrides) => {
  const rangeField = deepMerge<FieldTypes, Omit<Partial<FieldTypes>, 'type'>>(
    {
      name: 'number',
      type: 'number',
      admin: {
        components: {
          Field: NumericComponent,
        },
      },
      ...(range?.min
        ? {
            min: range.min,
          }
        : {}),
      ...(range?.max
        ? {
            max: range.max,
          }
        : {}),
      custom: {
        config: range,
      },
    },
    overrides,
  )

  const fields = [rangeField]

  return fields
}
