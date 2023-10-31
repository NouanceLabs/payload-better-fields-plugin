import type { Field } from 'payload/types'
import deepMerge, { isObject } from '../../utilities/deepMerge'
import Component from './Component'
import type { SlugifyOptions } from '../../types'
import { TextField, CheckboxField } from 'payload/types'
import beforeValidate from './beforeValidate'
import { PartialRequired } from '../../utilities/partialRequired'

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
  },
  checkbox = {
    enable: true,
    overrides: {
      name: 'editSlug',
    },
  },
) => {
  const slugifyOptions: SlugifyOptions = deepMerge(
    {
      lower: true,
      remove: /[*+~.()'"!?#\.,:@]/g,
    },
    config.slugify,
  )

  const checkboxField = deepMerge(
    {
      name: 'editSlug',
      label: 'Edit slug',
    },
    checkbox.overrides,
  )

  const editField = deepMerge<CheckboxField, Partial<CheckboxField>>(
    {
      name: checkboxField.name,
      label: checkboxField.label,
      type: 'checkbox',
      required: false,
      admin: {
        disabled: !checkbox.enable,
        hidden: true,
      },
    },
    checkboxField,
  )

  const slugField = deepMerge<TextField, Partial<TextField>>(
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      index: true,
      required: false,
      hooks: {
        beforeValidate: [
          beforeValidate(
            config.useFields,
            Boolean(checkbox.enable),
            editField.name,
            slugifyOptions,
          ),
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
