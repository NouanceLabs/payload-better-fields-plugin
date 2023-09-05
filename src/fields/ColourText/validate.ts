import { Validate } from 'payload/types'
import validateColor from 'validate-color'

const validate =
  (required?: boolean): Validate =>
  value => {
    console.log('validate value', value, !Boolean(value))

    if (!Boolean(required) && (!Boolean(value) || value === '')) {
      return true
    } else if (Boolean(required) && (!Boolean(value) || value === '')) {
      return 'This field is required.'
    }
    if (validateColor(value)) return true

    return 'This is not a valid colour value.'
  }

export default validate
