import { CollectionConfig } from 'payload/types'
import { SlugField } from '../../../src'

const SlugExamples: CollectionConfig = {
  slug: 'slugExamples',
  versions: {
    drafts: {
      autosave: true,
    },
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'nested',
      label: 'Nested group',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
      ],
    },
    ...SlugField(
      {
        name: 'slug',
        label: { en: 'Slug eng', de: 'Slug in german' },
        admin: {
          position: 'sidebar',
        },
      },
      {
        useFields: ['title', 'subtitle'],
        appendOnDuplication: true,
        slugify: {
          remove: /[*+~.()'"!?#\.,:@]/g,
        },
      },
    ),
    ...SlugField(
      {
        name: 'disabledCheckbox',
        label: 'Disabled checkbox',
      },
      {
        useFields: ['title', 'subtitle'],
        appendOnDuplication: true,
      },
      {
        enable: false,
        overrides: {
          name: 'disabledEditSlug',
        },
      },
    ),
    {
      name: 'another',
      type: 'group',
      fields: [
        ...SlugField(
          {
            name: 'secondSlug',
            index: false,
            unique: false,
            admin: {
              position: 'sidebar',
            },
          },
          {
            useFields: ['nested.heading'],
          },
          {
            enable: true,
            overrides: {
              name: 'secondEdit',
            },
          },
        ),
        {
          name: 'randomField',
          type: 'text',
        },
      ],
    },
  ],
}

export default SlugExamples
