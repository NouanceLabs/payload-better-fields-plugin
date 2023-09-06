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

/**
 * Marker item to map with datalist options accepting string values
 */
export type MarkerItem = {
  value: string
}

/**
 * Marker item to map with datalist options accepting number values
 */
export type NumberMarkerItem = {
  value: number
  label?: string
}
