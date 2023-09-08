import { FieldHook } from 'payload/types'
import getItemInNestObject from '../../utilities/getItemInNestObject'
import { Config } from '.'

const beforeValidate =
  (watchFields: string[], options: Config): FieldHook =>
  ({ siblingData, value, originalDoc, data, req, operation }) => {
    if (operation === 'create') {
      return value
    }
    let missingFields: string[] = []

    const fields = watchFields.map(field => {
      /* @ts-expect-error */
      const nestedItem = getItemInNestObject(field, data) as string

      if (!nestedItem) {
        missingFields.push(field)
      } else {
        return nestedItem
      }
    })

    /* Repeat the same but in the original doc to make sure we get all the data we can */
    if (missingFields.length > 0 && Boolean(originalDoc)) {
      missingFields.forEach(field => {
        const nestedItem = getItemInNestObject(field, originalDoc) as string

        if (nestedItem) {
          fields.push(nestedItem)
        }
      })
    }

    const separator = options?.separator ?? ' '

    const processedValue = fields
      .filter(item => Boolean(item))
      .reduce((accumulator, currentValue, currentIndex) => {
        const value = options.callback
          ? options.callback(String(currentValue))
          : String(currentValue)

        return String(accumulator) + (currentIndex > 0 ? separator : '') + value
      }, options.initial)

    return processedValue
  }

export default beforeValidate
