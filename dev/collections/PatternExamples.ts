import type { CollectionConfig } from 'payload'

import { PatternField } from '@nouance/payload-better-fields-plugin/Pattern'

export const PatternExamples: CollectionConfig = {
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
        admin: {
          placeholder: '% 20',
        },
        required: false,
      },
      {
        allowEmptyFormatting: true,
        format: '+1 (###) #### ###',
        mask: '_',
        prefix: '% ',
      },
    ),
  ],
}
