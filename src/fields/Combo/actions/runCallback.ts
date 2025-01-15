import { Config } from '../'

type Arguments = {
  callback: Config['callback']
}

export async function runCallback({ callback }: Arguments, value?: string) {
  'use server'

  return value ?? ''
}
