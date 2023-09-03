export interface PluginTypes {
  /**
   * Enable or disable plugin
   * @default false
   */
  enabled?: boolean
}

/**
 * Provides additional options for the slugify function
 */
export type SlugifyOptions = {
  replacement?: string | undefined
  remove?: RegExp | undefined
  lower?: boolean | undefined
  strict?: boolean | undefined
  locale?: string | undefined
  trim?: boolean | undefined
}
