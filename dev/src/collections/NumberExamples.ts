import { CollectionConfig } from 'payload/types'
import { NumberField } from '../../../src'
import slugify from 'slugify'

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
            component: 'numeric',
            prefix: '$ ',
            min: 5,
            thousandSeparator: ',',
            decimalScale: 2,
            fixedDecimalScale: true,
          },
          {
            name: 'price',
            required: true,
            admin: {},
          },
        ),
        ...NumberField(
          {
            component: 'numeric',
            prefix: '% ',
            max: 20,
            min: 5,
            decimalScale: 0,
            fixedDecimalScale: true,
          },
          {
            name: 'discount',
            required: true,
            min: 0,
            max: 20,
            admin: {
              placeholder: '% 20',
            },
          },
        ),
      ],
    },
    ...NumberField(
      {
        component: 'pattern',
        format: '+1 (###) #### ###',
        prefix: '% ',
        allowEmptyFormatting: true,
        mask: '_',
      },
      {
        name: 'telephone',
        required: false,
        admin: {
          placeholder: '% 20',
        },
      },
    ),
  ],
}

export default NumberExamples
