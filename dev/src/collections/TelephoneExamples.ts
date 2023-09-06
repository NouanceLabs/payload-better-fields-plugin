import { CollectionConfig } from 'payload/types'
import { TelephoneField } from '../../../src'

const TelephoneExamples: CollectionConfig = {
  slug: 'telephoneExamples',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    ...TelephoneField({
      name: 'telephone',
      required: true,
      admin: {
        placeholder: '+12133734253',
        width: '33%',
      },
    }),
    ...TelephoneField(
      {
        name: 'fax',
        required: false,
        admin: {
          position: 'sidebar',
          placeholder: '+12133734253',
        },
      },
      {
        defaultCountry: 'US',
        international: true,
      },
    ),
  ],
}

export default TelephoneExamples
