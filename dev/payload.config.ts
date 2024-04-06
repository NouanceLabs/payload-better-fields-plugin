import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import path from 'path'
import Users from './src/collections/Users'
import SlugExamples from './src/collections/SlugExamples'
import ComboExamples from './src/collections/ComboExamples'
import NumberExamples from './src/collections/NumberExamples'
import PatternExamples from './src/collections/PatternExamples'
import ColourTextExamples from './src/collections/ColourTextExamples'
import RangeExamples from './src/collections/RangeExamples'
import TelephoneExamples from './src/collections/TelephoneExamples'
import AlertBoxExamples from './src/collections/AlertBoxExamples'
import ColourPickerExamples from './src/collections/ColourPickerExamples'
import DateExamples from './src/collections/DateExample'

export default buildConfig({
  serverURL: process.env.SERVER_URL,
  editor: lexicalEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
  }),
  admin: {
    user: Users.slug,
  },
  collections: [
    /* SlugExamples,
    AlertBoxExamples,
    ComboExamples,
    NumberExamples,
    PatternExamples,
    ColourTextExamples,
    RangeExamples,
    TelephoneExamples,
    ColourPickerExamples, */
    Users,
    /* DateExamples, */
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  secret: process.env.PAYLOAD_SECRET,
  plugins: [],
})
