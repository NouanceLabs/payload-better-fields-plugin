import type { Validate } from 'payload'

import { isPossiblePhoneNumber } from 'libphonenumber-js'

export const validate =
  (required?: boolean): Validate =>
  (value) => {
    if (!required && (!value || value === '')) {
      return true
    } else if (Boolean(required) && (!value || value === '')) {
      return 'This field is required.'
    }
    if (isPossiblePhoneNumber(value)) {
      return true
    }

    return 'This is not a possible phone number.'
  }
