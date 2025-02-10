import type { CheckboxField, Field, FieldHook, TextField } from 'payload'
import type { PartialRequired } from 'src/types.js'

import { deepMerge } from 'payload'

import type { SlugOptions } from './types.js'

import { beforeValidate } from './beforeValidate.js'

/**
 * Additional config unique to the Slug field
 */
export type Config = {
  /**
   * Append a '-1' on duplication of collection in the case that the slug needs to be unique
   */
  appendOnDuplication?: boolean
  /**
   * Options passed to the slugify function
   * @default { lower: true }
   */
  slug?: SlugOptions
  /**
   * An array of string mapping the field path names, nested fields are supported here
   * @default {string[]} ['title']
   */
  useFields: string[]
}

/**
 * Additional config unique to the checkbox field
 */
export type CheckboxConfig = {
  /**
   * Disable or enable the checkbox for edit slug field
   * @default true
   */
  enable?: boolean
  /**
   * Edit checkbox field overrides, which allows the slug to be editable
   *
   * @default {
      name: 'editSlug',
      label: 'Edit slug',
    }
   */
  overrides?: Partial<CheckboxField>
}

type Slug = (
  /**
   * Slug field overrides
   */
  slugOverrides: PartialRequired<TextField, 'name'>,
  /**
   * Slug field config
   */
  config: Config,
  /**
   * Checkbox field config
   */
  checkbox?: CheckboxConfig,
) => Field[]

export const SlugField: Slug = (
  slugOverrides = { name: 'slug' },
  config = {
    slug: {
      lower: true,
      remove: `/[*+~.()'"!?#,:@]/g`,
    },
    appendOnDuplication: false,
    useFields: ['title'],
  },
  checkbox = {
    enable: true,
    overrides: {
      name: 'editSlug',
    },
  },
) => {
  const slugOptions: SlugOptions = {
    lower: true,
    remove: `/[*+~/\\.()'"!?#,:@]/g`,
    ...config.slug,
  }

  const checkboxField = deepMerge(
    {
      name: 'editSlug',
      label: 'Edit slug',
    },
    checkbox.overrides ?? {},
  )

  const checkboxName = checkboxField.name
  const slugName = slugOverrides.name ?? 'slug'

  const checkboxDedupe: FieldHook[] = [
    ({ operation, siblingData }) => {
      if (operation === 'create') {
        const slugValue = siblingData[slugName]

        if (slugValue && slugValue !== '') {
          return true
        }
      }
    },
  ]

  const slugDedupe: FieldHook[] = [
    ({ operation, value }) => {
      if (operation === 'create') {
        if (value && value !== '') {
          const incrementedValue = value + '-1'

          return incrementedValue
        }
      }
    },
  ]

  const editField = deepMerge<CheckboxField, Partial<CheckboxField>>(
    {
      name: checkboxName,
      type: 'checkbox',
      admin: {
        disabled: !checkbox.enable,
        hidden: true,
      },
      hooks: {
        // beforeValidate: [...(config.appendOnDuplication ? checkboxDedupe : [])],
      },
      label: checkboxField.label,
      required: false,
    },
    checkboxField,
  )

  const slugField = deepMerge<TextField, Partial<TextField>>(
    {
      name: slugName,
      type: 'text',
      admin: {
        components: {
          Field: {
            clientProps: {
              config: {
                editFieldConfig: editField,
                enableEditSlug: Boolean(checkbox.enable),
                slugOptions,
                watchFields: config.useFields,
              },
            },
            path: '@nouance/payload-better-fields-plugin/Slug#SlugComponent',
          },
        },
        readOnly: false,
      },
      hooks: {
        beforeValidate: [
          beforeValidate(config.useFields, Boolean(checkbox.enable), checkboxName, slugOptions),
          ...(config.appendOnDuplication ? slugDedupe : []),
        ],
      },
      index: true,
      required: false,
      unique: true,
    },
    slugOverrides,
  )

  const fields = [slugField, editField]

  return fields
}
