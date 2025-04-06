import type { CheckboxField, TextField } from 'payload'

import { formatSlugHook } from './formatSlug.js'

type Overrides = {
  checkboxOverrides?: Partial<CheckboxField>
  slugOverrides?: Partial<TextField>
}

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField]

export const SlugField: Slug = (fieldToUse = 'title', overrides = {}) => {
  const { checkboxOverrides, slugOverrides } = overrides

  const checkBoxField: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    admin: {
      hidden: true,
      position: 'sidebar',
    },
    defaultValue: true,
    ...checkboxOverrides,
  }

  // @ts-expect-error - ts mismatch Partial<TextField> with TextField
  const slugField: TextField = {
    name: 'slug',
    type: 'text',
    index: true,
    label: 'Slug',
    unique: true,
    ...(slugOverrides || {}),
    admin: {
      position: 'sidebar',
      ...(slugOverrides?.admin || {}),
      components: {
        Field: {
          clientProps: {
            checkboxFieldPath: checkBoxField.name,
            fieldToUse,
          },
          path: '@nouance/payload-better-fields-plugin/Slug#SlugComponent',
        },
      },
    },
    hooks: {
      // Kept this in for hook or API based updates
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
  }

  return [slugField, checkBoxField]
}
