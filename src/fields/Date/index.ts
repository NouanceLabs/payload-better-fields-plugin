import type { Field, Option } from 'payload/types'
import deepMerge from '../../utilities/deepMerge'
import DateComponent from './Component'
import { DateField as DateFieldType, SelectField } from 'payload/types'
import { PartialRequired } from '../../utilities/partialRequired'
import { timezones } from './timezones'

/**
 * Config for the timezone functionality
 */
export type Timezone = {
  /**
   * @default true
   */
  enable: boolean
  /**
   * Saves the date with timezone information stored
   * @default false
   */
  //saveWithTimezone: boolean
  /**
   * Array of options for timezones
   */
  timezones?: Option[]
  /**
   * Timezone select field overrides. Add timezones to the 'timezones' property not the field options
   */
  overrides: Omit<PartialRequired<SelectField, 'name'>, 'type' | 'options'>
}

type Date = (
  /**
   * Field overrides
   */
  dateOverrides: Omit<PartialRequired<DateFieldType, 'name'>, 'type'>,
  timezone?: Timezone,
) => Field[]

export const DateField: Date = (
  dateOverrides,
  timezone = {
    enable: true,
    timezones,
    overrides: { name: 'timezoneSelect' },
  },
) => {
  const timezoneField = deepMerge<SelectField, Omit<Partial<SelectField>, 'type'>>(
    {
      name: 'timezoneSelect',
      label: 'Select Timezone',
      type: 'select',
      options: timezone.timezones ?? timezones,
      admin: {
        hidden: true,
      },
    },
    timezone.overrides,
  )

  const dateField = deepMerge<DateFieldType, Omit<Partial<DateFieldType>, 'type'>>(
    {
      name: 'date',
      type: 'date',
      admin: {
        components: {
          Field: DateComponent,
        },
      },
      custom: {
        config: { ...timezone, timezones: timezoneField.options },
        timezoneField,
      },
    },
    dateOverrides,
  )

  const fields = [dateField, timezoneField]

  return fields
}
