import { CollectionConfig } from 'payload/types'
import { ColourPickerField } from '../../../src'

const ColourPickerExamples: CollectionConfig = {
  slug: 'colourPickerExamples',
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
        ...ColourPickerField({
          name: 'colour',
          required: true,
          admin: {
            description: 'Default Hex',
          },
        }),
        ...ColourPickerField(
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
        ...ColourPickerField(
          {
            name: 'hsla',
            admin: {
              description: 'HSLA readonly',
              readOnly: true,
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

export default ColourPickerExamples
