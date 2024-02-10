import { CollectionConfig } from 'payload/types'
import { SmartColourField } from '../../../src'

const SmartColourExamples: CollectionConfig = {
  slug: 'smartColourExamples',
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
        ...SmartColourField({
          name: 'colour',
          required: true,
          admin: {
            description: 'Default Hex',
          },
        }),
        ...SmartColourField(
          {
            name: 'optional',
            admin: {
              description: 'RGBA Expanded',
            },
          },
          {
            type: 'rgbA',
            expanded: true,
          },
        ),
        ...SmartColourField(
          {
            name: 'hsla',
            admin: {
              description: 'HSLA with presets',
            },
          },
          {
            type: 'hslA',
          },
        ),
      ],
    },
  ],
}

export default SmartColourExamples
