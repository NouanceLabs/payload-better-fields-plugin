import type { CollectionConfig } from 'payload'

import { SlugField } from '@nouance/payload-better-fields-plugin/Slug'

export const SlugExamples: CollectionConfig = {
  slug: 'slugExamples',
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
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
      ],
      label: 'Nested group',
    },
    ...SlugField(
      {
        name: 'slug',
        admin: {
          position: 'sidebar',
        },
        label: { de: 'Slug in german', en: 'Slug eng' },
      },
      {
        slug: {
          remove: `/[*+~.()'"!?#,:@]/g`,
        },
        appendOnDuplication: true,
        useFields: ['title', 'subtitle'],
      },
    ),
    ...SlugField(
      {
        name: 'disabledCheckbox',
        label: 'Disabled checkbox',
      },
      {
        appendOnDuplication: true,
        useFields: ['title', 'subtitle'],
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
            admin: {
              position: 'sidebar',
            },
            index: false,
            unique: false,
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
  versions: {
    drafts: {
      autosave: true,
    },
  },
}
