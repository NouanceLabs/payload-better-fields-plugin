import { CollectionConfig } from 'payload/types'
import { ColourTextField } from '../../../src'

const ColourTextExamples: CollectionConfig = {
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

export default ColourTextExamples
