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
        name: 'telephone',
        type: 'text',
        required: false,
        admin: {
          placeholder: '% 20',
        },
      },
      {
        format: '+1 (###) #### ###',
        prefix: '% ',
        allowEmptyFormatting: true,
        mask: '_',
      },
    ),
  ],
}

export default PatternExamples
