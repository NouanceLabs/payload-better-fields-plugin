import type { CollectionConfig } from 'payload'

import { ComboField } from '@nouance/payload-better-fields-plugin/Combo'

export const ComboExamples: CollectionConfig = {
  slug: 'comboExamples',
  admin: {
    useAsTitle: 'fullName',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
        },
        {
          name: 'lastName',
          type: 'text',
        },
      ],
    },
    ...ComboField(
      {
        name: 'fullName',
        admin: { readOnly: true },
        label: { de: 'Full name in german', en: 'Full name' },
      },
      ['firstName', 'lastName'],
    ),
    ...ComboField({ name: 'identifier', admin: { readOnly: true } }, ['lastName'], {
      callback: (value) => {
        return value.toUpperCase()
      },
      initial: 'ID-',
      separator: '-',
    }),
  ],
  versions: {
    drafts: {
      autosave: true,
    },
  },
}
