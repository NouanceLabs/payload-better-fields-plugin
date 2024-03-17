import type { Field } from 'payload/types'
import deepMerge, { isObject } from '../../utilities/deepMerge'
import Component from './Component'
import type { SlugifyOptions } from '../../types'
import { TextField, CheckboxField } from 'payload/types'
import beforeValidate from './beforeValidate'
import { PartialRequired } from '../../utilities/partialRequired'
import { FieldHook } from 'payload/types'

/**
 * Additional config unique to the Slug field
 */
export type Config = {
  /**
   * An array of string mapping the field path names, nested fields are supported here
   * @default {string[]} ['title']
   */
  useFields: string[]
  /**
   * Append a '-1' on duplication of collection in the case that the slug needs to be unique
   */
  appendOnDuplication?: boolean
  /**
   * Options passed to the slugify function
   * @default { lower: true }
   */
  slugify?: SlugifyOptions
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
    useFields: ['title'],
    slugify: { lower: true, remove: /[*+~.()'"!?#\.,:@]/g },
    appendOnDuplication: false,
  },
  checkbox = {
    enable: true,
    overrides: {
      name: 'editSlug',
    },
  },
) => {
  const slugifyOptions: SlugifyOptions = {
    lower: true,
    remove: /[*+~\/\\.()'"!?#\.,:@]/g,
    ...config.slugify,
  }

  const checkboxField = deepMerge(
    {
      name: 'editSlug',
      label: 'Edit slug',
    },
    checkbox.overrides,
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
      label: checkboxField.label,
      type: 'checkbox',
      required: false,
      admin: {
        disabled: !checkbox.enable,
        hidden: true,
      },
      hooks: {
        beforeValidate: [...(config.appendOnDuplication ? checkboxDedupe : [])],
      },
    },
    checkboxField,
  )

  const slugField = deepMerge<TextField, Partial<TextField>>(
    {
      name: slugName,
      type: 'text',
      index: true,
      required: false,
      hooks: {
        beforeValidate: [
          beforeValidate(config.useFields, Boolean(checkbox.enable), checkboxName, slugifyOptions),
          ...(config.appendOnDuplication ? slugDedupe : []),
        ],
      },
      unique: true,
      admin: {
        readOnly: false,
        components: {
          Field: Component,
        },
      },
      custom: {
        watchFields: config.useFields,
        slugifyOptions: slugifyOptions,
        editFieldConfig: editField,
        enableEditSlug: Boolean(checkbox.enable),
      },
    },
    slugOverrides,
  )

  const fields = [slugField, editField]

  return fields
}
