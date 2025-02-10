import type { CollectionConfig } from 'payload'

import { RangeField } from '@nouance/payload-better-fields-plugin/Range'

export const RangeExamples: CollectionConfig = {
  slug: 'rangeExamples',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    ...RangeField(
      {
        name: 'groups',
        admin: {
          description: 'Hello world',
        },
        required: true,
      },
      { max: 200, min: 5, showPreview: true, step: 5 },
    ),
    ...RangeField(
      {
        name: 'quantity',
      },
      {
        markers: [
          { value: 5 },
          { label: 'Low', value: 15 },
          { label: 'Med', value: 30 },
          { value: 38 },
          { label: 'High', value: 40 },
          { value: 45 },
        ],
        max: 45,
        min: 5,
        showPreview: true,
      },
    ),
    {
      name: 'notes',
      type: 'text',
    },
  ],
}
