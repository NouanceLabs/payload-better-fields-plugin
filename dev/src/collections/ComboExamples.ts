import { CollectionConfig } from 'payload/types'
import { ComboField } from '../../../src'
import slugify from 'slugify'

const ComboExamples: CollectionConfig = {
  slug: 'comboExamples',
  admin: {
    useAsTitle: 'fullName',
  },
  versions: {
    drafts: {
      autosave: true,
    },
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
    ...ComboField({ name: 'fullName', admin: { readOnly: true } }, ['firstName', 'lastName']),
    ...ComboField({ name: 'identifier', admin: { readOnly: true } }, ['lastName'], {
      initial: 'ID-',
      separator: '-',
      callback: value => slugify(value).toUpperCase(),
    }),
  ],
}

export default ComboExamples
