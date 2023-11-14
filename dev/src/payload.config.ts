import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import path from 'path'
import Users from './collections/Users'
import SlugExamples from './collections/SlugExamples'
import ComboExamples from './collections/ComboExamples'
import NumberExamples from './collections/NumberExamples'
import PatternExamples from './collections/PatternExamples'
import ColourTextExamples from './collections/ColourTextExamples'
import RangeExamples from './collections/RangeExamples'
import TelephoneExamples from './collections/TelephoneExamples'
import AlertBoxExamples from './collections/AlertBoxExamples'

export default buildConfig({
  serverURL: process.env.SERVER_URL,
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
  }),
  admin: {
    bundler: webpackBundler(),
    user: Users.slug,
    webpack: config => {
      const newConfig = {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...(config?.resolve?.alias || {}),
            react: path.join(__dirname, '../node_modules/react'),
            'react-dom': path.join(__dirname, '../node_modules/react-dom'),
            payload: path.join(__dirname, '../node_modules/payload'),
          },
        },
      }
      return newConfig
    },
  },
  collections: [
    SlugExamples,
    AlertBoxExamples,
    ComboExamples,
    NumberExamples,
    PatternExamples,
    ColourTextExamples,
    RangeExamples,
    TelephoneExamples,
    Users,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [],
})
