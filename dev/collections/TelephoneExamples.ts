import type { CollectionConfig } from 'payload'

import { TelephoneField } from '@nouance/payload-better-fields-plugin/Telephone'

export const TelephoneExamples: CollectionConfig = {
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
      admin: {
        placeholder: '+12133734253',
        width: '33%',
      },
      required: true,
    }),
    ...TelephoneField(
      {
        name: 'fax',
        admin: {
          description: 'Hello world!',
          placeholder: '+12133734253',
          position: 'sidebar',
        },
        required: false,
      },
      {
        defaultCountry: 'US',
        international: true,
      },
    ),
  ],
}
