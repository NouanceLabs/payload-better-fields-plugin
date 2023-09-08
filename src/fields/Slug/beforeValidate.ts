import { FieldHook } from 'payload/types'
import getItemInNestObject from '../../utilities/getItemInNestObject'
import type { SlugifyOptions } from '../../types'
import slugify from 'slugify'

const beforeValidate =
  (
    watchFields: string[],
    enableEditSlug: boolean,
    editFieldName: string,
    slugifyOptions: SlugifyOptions,
  ): FieldHook =>
  ({ siblingData, value, originalDoc, data, req }) => {
    if (enableEditSlug && Boolean(siblingData[editFieldName])) {
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

    const separator = slugifyOptions?.replacement ?? '-'

    const processedValue = fields
      .filter(item => Boolean(item))
      .reduce((accumulator, currentValue, currentIndex) => {
        return (
          String(accumulator) +
          (currentIndex > 0 ? separator : '') +
          slugify(String(currentValue), slugifyOptions)
        )
      }, '')

    return processedValue
  }

export default beforeValidate
