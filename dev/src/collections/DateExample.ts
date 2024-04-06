import { CollectionConfig } from 'payload/types'
import { DateField } from '../../../src'

const DateExamples: CollectionConfig = {
  slug: 'dateExamples',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      type: 'date',
      name: 'defaultDate',
      admin: {
        description: 'Default date field behaviour',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      type: 'row',
      fields: [
        ...DateField({
          name: 'date',
          admin: {
            description: 'You can choose a timezone',
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        }),
      ],
    },
  ],
}

export default DateExamples
