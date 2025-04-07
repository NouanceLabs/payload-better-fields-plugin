import type { Field, TextField as TextFieldType } from 'payload'
import type { Country } from 'react-phone-number-input'

import { deepMerge } from 'payload'

import { validate } from './validate.js'

type FieldTypes = TextFieldType

export type PartialRequired<T, K extends keyof T> = Partial<T> & Pick<T, K>

/**
 * Additional config unique to the Telephone input
 * See https://catamphetamine.gitlab.io/react-phone-number-input/ for more information
 */
export interface Config {
  /**
   * You can provide an ISO 2-letter country code eg. 'US'
   * If country is specified then the phone number can only be input in "national" (not "international") format
   */
  country?: string
  countryCallingCodeEditable?: boolean
  countrySelectProps?: {
    /**
     * 	Set to `true` to render Unicode flag icons instead of SVG images
     */
    unicodeFlags?: boolean
  }
  /**
   * You can provide an ISO 2-letter country code eg. 'US'
   * If defaultCountry is specified then the phone number can be input both in "international" format and "national" format
   */
  defaultCountry?: Country
  /**
   * If an initial value is passed, and initialValueFormat is "national", then the initial value is formatted in national format
   */
  initialValueFormat?: 'national'
  /**
   * Forces international formatting
   * @default true
   */
  international?: boolean
  /**
   * When the user attempts to insert a digit somewhere in the middle of a phone number, the caret position is moved right before the next available digit skipping any punctuation in between
   */
  smartCaret?: boolean
  /**
   * When defaultCountry is defined and the initial value corresponds to defaultCountry, then the value will be formatted as a national phone number by default
   */
  useNationalFormatForDefaultCountryValue?: boolean
  /**
   * If country is specified and international property is true then the phone number can only be input in "international" format for that country
   */
  withCountryCallingCode?: boolean
}

type Telephone = (
  /**
   * Field overrides
   */
  overrides: Omit<FieldTypes, 'type'>,
  config?: Config,
) => Field[]

export const TelephoneField: Telephone = (
  overrides,
  config = {
    international: true,
  },
) => {
  const telephoneField = deepMerge<FieldTypes, Omit<Partial<FieldTypes>, 'type'>>(
    {
      name: 'telephone',
      type: 'text',
      admin: {
        components: {
          Field: {
            clientProps: {
              config,
            },
            path: '@nouance/payload-better-fields-plugin/Telephone#TelephoneComponent',
          },
        },
      },
      validate: validate(overrides.required),
    },
    overrides,
  )

  const fields = [telephoneField]

  return fields
}
