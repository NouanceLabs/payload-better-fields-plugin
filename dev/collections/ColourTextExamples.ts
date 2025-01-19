import type { CollectionConfig } from 'payload'

import { ColourTextField } from '@nouance/payload-better-fields-plugin/ColourText'

export const ColourTextExamples: CollectionConfig = {
  slug: 'colourTextExamples',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        ...ColourTextField({
          name: 'colour',
          required: true,
        }),
        ...ColourTextField({
          name: 'optional',
        }),
      ],
    },
  ],
}
