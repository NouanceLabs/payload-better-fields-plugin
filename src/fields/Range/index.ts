import type { Field } from 'payload/types'
import deepMerge from '../../utilities/deepMerge'
import RangeComponent from './Component'
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
  config: Config,
  /**
   * Field overrides
   */
  overrides: Omit<PartialRequired<FieldTypes, 'name'>, 'type'>,
) => Field[]

export const RangeField: Range = (config = {}, overrides) => {
  const rangeField = deepMerge<FieldTypes, Omit<Partial<FieldTypes>, 'type'>>(
    {
      name: 'range',
      type: 'number',
      admin: {
        components: {
          Field: RangeComponent,
        },
      },
      ...(config?.min
        ? {
            min: config.min,
          }
        : {}),
      ...(config?.max
        ? {
            max: config.max,
          }
        : {}),
      custom: {
        config: config,
      },
    },
    overrides,
  )

  const fields = [rangeField]

  return fields
}
