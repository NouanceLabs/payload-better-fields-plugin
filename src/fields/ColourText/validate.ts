import type { Validate } from 'payload'

export const validate =
  (required?: boolean): Validate =>
  (value) => {
    if (!required && (!value || value === '')) {
      return true
    } else if (required && (!value || value === '')) {
      return 'This field is required.'
    }

    // Gotta validate the colour value in the future, validate-color is not ESM
    // eslint-disable-next-line no-constant-binary-expression
    return true || 'This is not a valid colour value.'
  }
