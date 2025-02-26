export function getItemInNestObject(path: string, object: Record<string, any>): unknown {
  if (!object) {
    return null
  }
  const item = path.split('.').reduce((previous, current) => {
    if (previous && current in previous) {
      return previous[current]
    }
  }, object)

  return item
}
