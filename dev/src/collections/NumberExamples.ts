import { CollectionConfig } from 'payload/types'
import { NumberField } from '../../../src'

const NumberExamples: CollectionConfig = {
  slug: 'numberExamples',
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
        ...NumberField(
          {
            name: 'price',
            required: true,
          },
          {
            prefix: '$ ',
            min: 5,
            thousandSeparator: ',',
            decimalScale: 2,
            fixedDecimalScale: true,
          },
        ),
        ...NumberField(
          {
            name: 'discount',
            required: true,
            min: 0,
            max: 20,
            admin: {
              placeholder: '% 20',
            },
          },
          {
            prefix: '% ',
            min: 5,
            max: 20,
            decimalScale: 0,
            fixedDecimalScale: true,
          },
        ),
      ],
    },
  ],
}

export default NumberExamples
