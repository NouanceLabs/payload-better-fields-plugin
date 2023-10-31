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
        admin: {
          position: 'sidebar',
        },
      },
      {
        useFields: ['title', 'subtitle'],
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
      ],
    },
  ],
}

export default SlugExamples
