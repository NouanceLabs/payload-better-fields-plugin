import type { CollectionConfig } from 'payload'

import { ColourPickerField } from '@nouance/payload-better-fields-plugin/ColourPicker'

export const ColourPickerExamples: CollectionConfig = {
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
          admin: {
            description: 'Default Hex',
          },
          required: true,
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
              description: 'HSLA preview',
            },
          },
          {
            type: 'hslA',
            showPreview: true,
          },
        ),
      ],
    },
  ],
}
