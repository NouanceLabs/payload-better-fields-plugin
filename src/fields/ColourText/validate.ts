import type { Validate } from 'payload'

import { validateHTMLColor } from 'validate-color'

export const validate =
  (required?: boolean): Validate =>
  (value) => {
    if (!required && (!value || value === '')) {
      return true
    } else if (required && (!value || value === '')) {
      return 'This field is required.'
    }

    return validateHTMLColor(value) || 'This is not a valid colour value.'
  }
