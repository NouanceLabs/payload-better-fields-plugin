import type { Field, NumberField as NumberFieldType } from 'payload'
import type { PartialRequired } from 'src/types.js'

import { deepMerge } from 'payload'

import type { NumberMarkerItem } from './types.js'

type FieldTypes = NumberFieldType

/**
 * Additional config unique to the range input
 */
export type Config = {
  /**
   * You can provide an array of markers https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#adding_tick_marks
   */
  markers?: NumberMarkerItem[]
  /**
   * @default 100
   */
  max?: number
  /**
   * @default 1
   */
  min?: number
  /**
   * Shows the value previewed next to the field
   */
  showPreview?: boolean
  /**
   * @default 1
   */
  step?: 'any' | number
}

type Range = (
  /**
   * Field overrides
   */
  overrides: Omit<PartialRequired<FieldTypes, 'name'>, 'type'>,
  config: Config,
) => Field[]

export const RangeField: Range = (overrides, config = {}) => {
  const rangeField = deepMerge<FieldTypes, Omit<Partial<FieldTypes>, 'type'>>(
    {
      name: 'range',
      type: 'number',
      admin: {
        components: {
          Field: {
            clientProps: {
              config,
            },
            path: '@nouance/payload-better-fields-plugin/Range#RangeComponent',
          },
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
    },
    overrides,
  )

  const fields = [rangeField]

  return fields
}
