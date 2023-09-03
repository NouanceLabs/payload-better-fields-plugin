import { CollectionConfig } from 'payload/types'
import { SlugField } from '../../../src'

const SlugExamples: CollectionConfig = {
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
      label: 'Nested group',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
      ],
    },
    ...SlugField(['title', 'subtitle'], undefined, {
      admin: {
        position: 'sidebar',
      },
    }),
    {
      name: 'another',
      type: 'group',
      fields: [
        ...SlugField(
          ['nested.heading'],
          undefined,
          {
            name: 'secondSlug',
            admin: {
              position: 'sidebar',
            },
          },
          true,
          {
            name: 'secondEdit',
          },
        ),
      ],
    },
  ],
}

export default SlugExamples
