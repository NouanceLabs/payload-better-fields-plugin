import type { FieldHook } from 'payload'

import slug from 'slug'

import type { SlugOptions } from './types.js'

import { getItemInNestObject } from './getItemInNestedObject.js'

export const beforeValidate =
  (watchFields: string[], enableEditSlug: boolean, editFieldName: string, slugOptions: SlugOptions): FieldHook =>
  ({ data, originalDoc, siblingData, value }) => {
    if (enableEditSlug && Boolean(siblingData[editFieldName])) {
      return value
    }

    const missingFields: string[] = []

    const fields = watchFields.map((field) => {
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
      missingFields.forEach((field) => {
        const nestedItem = getItemInNestObject(field, originalDoc) as string

        if (nestedItem) {
          fields.push(nestedItem)
        }
      })
    }

    const separator = slugOptions?.replacement ?? '-'

    const processedValue = fields
      .filter((item) => Boolean(item))
      .reduce((accumulator, currentValue, currentIndex) => {
        // return String(accumulator) + (currentIndex > 0 ? separator : '') + slugify(String(currentValue), slugifyOptions)
        return String(accumulator) + (currentIndex > 0 ? separator : '') + slug(String(currentValue), slugOptions)
      }, '')

    return processedValue
  }
