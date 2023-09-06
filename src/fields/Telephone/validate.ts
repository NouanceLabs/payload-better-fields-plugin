import { isPossiblePhoneNumber } from 'react-phone-number-input'
import { Validate } from 'payload/types'

const validate =
  (required?: boolean): Validate =>
  value => {
    if (!Boolean(required) && (!Boolean(value) || value === '')) {
      return true
    } else if (Boolean(required) && (!Boolean(value) || value === '')) {
      return 'This field is required.'
    }
    if (isPossiblePhoneNumber(value)) return true

    return 'This is not a possible phone number.'
  }

export default validate
