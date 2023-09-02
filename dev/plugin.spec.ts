import type { Server } from 'http'
import mongoose from 'mongoose'
import payload from 'payload'
import { start } from './src/server'

describe('Plugin tests', () => {
  let server: Server

  beforeAll(async () => {
    server = await start({ local: true })
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    server.close()
  })

  it('seeds data accordingly', async () => {
    const newCollectionQuery = await payload.find({
      collection: 'new-collection',
      sort: 'createdAt',
    })

    expect(newCollectionQuery.totalDocs).toEqual(1)
  })
})
