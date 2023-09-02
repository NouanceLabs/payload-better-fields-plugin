import type { Field } from 'payload/types'
import deepMerge, { isObject } from '../../utilities/deepMerge'
import Component from './Component'
import type { SlugifyOptions } from '../../types'

type Slug = (
  /**
   * An array of string mapping the field path names, nested fields are supported here
   * @default {string[]} ['title']
   */
  fieldToUse?: string[],
  /**
   * Options passed to the slugify function
   * @default { lower: true }
   */
  slugifyOptions?: SlugifyOptions,
  /**
   * Slug field overrides
   */
  slugOverrides?: Partial<Field>,
  /**
   * Disable or enable the checkbox for edit slug field
   * @default true
   */
  enableEditSlug?: boolean,
  /**
   * Edit slug field overrides, this maps to the checkbox allowing the slug to be editable
   *
   * @default {
      name: 'editSlug',
      label: 'Edit slug',
    }
   */
  editSlugOverrides?: Partial<Field>,
) => Field[]

export const SlugField: Slug = (
  fieldToUse: string[] = ['title'],
  slugifyOptions = { lower: true, remove: /[*+~.()'"!?#\.,:@]/g },
  slugOverrides = {},
  enableEditSlug = true,
  editSlugOverrides = {
    name: 'editSlug',
    label: 'Edit slug',
  },
) => {
  const editFieldName = deepMerge(
    {
      name: 'editSlug',
      label: 'Edit slug',
    },
    editSlugOverrides,
  )

  const editField = deepMerge<Field, Partial<Field>>(
    {
      name: editFieldName.name,
      label: editFieldName.label,
      type: 'checkbox',
      required: true,
      admin: {
        disabled: !enableEditSlug,
        hidden: true,
      },
    },
    editSlugOverrides,
  )

  const slugField = deepMerge<Field, Partial<Field>>(
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      index: true,
      required: true,

      unique: true,
      admin: {
        readOnly: false,
        components: {
          Field: Component,
        },
      },
      custom: {
        watchFields: fieldToUse,
        slugifyOptions: slugifyOptions,
        editFieldConfig: editField,
        enableEditSlug: enableEditSlug,
      },
    },
    slugOverrides,
  )

  const fields = [slugField, editField]

  return fields
}
