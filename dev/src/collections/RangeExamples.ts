import { CollectionConfig } from 'payload/types'
import { RangeField } from '../../../src'
import slugify from 'slugify'

const RangeExamples: CollectionConfig = {
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
      { min: 5, max: 200, step: 5, showPreview: true },
      {
        name: 'groups',
        required: true,
      },
    ),
    ...RangeField(
      {
        min: 5,
        max: 45,
        showPreview: true,
        markers: [
          { value: 5 },
          { value: 15, label: 'Low' },
          { value: 30, label: 'Med' },
          { value: 38 },
          { value: 40, label: 'High' },
          { value: 45 },
        ],
      },
      {
        name: 'quantity',
      },
    ),
    {
      name: 'notes',
      type: 'text',
    },
  ],
}

export default RangeExamples
