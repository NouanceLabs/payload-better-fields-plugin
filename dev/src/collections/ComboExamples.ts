import { CollectionConfig } from 'payload/types'
import { ComboField } from '../../../src'
import slugify from 'slugify'

const ComboExamples: CollectionConfig = {
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
    ...ComboField(['firstName', 'lastName'], { name: 'fullName', admin: { readOnly: true } }),
    ...ComboField(
      ['lastName'],
      { name: 'identifier', admin: { readOnly: true } },
      { initial: 'ID-', separator: '-', callback: value => slugify(value).toUpperCase() },
    ),
  ],
}

export default ComboExamples
