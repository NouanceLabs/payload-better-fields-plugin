import { CollectionConfig } from 'payload/types'
import { PatternField } from '../../../src'

const PatternExamples: CollectionConfig = {
  slug: 'patternExamples',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    ...PatternField(
      {
        format: '+1 (###) #### ###',
        prefix: '% ',
        allowEmptyFormatting: true,
        mask: '_',
      },
      {
        name: 'telephone',
        type: 'text',
        required: false,
        admin: {
          placeholder: '% 20',
        },
      },
    ),
  ],
}

export default PatternExamples
