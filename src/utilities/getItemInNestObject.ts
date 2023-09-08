export default function getItemInNestObject(path: string, object: Record<string, any>): unknown {
  if (!Boolean(object)) {
    return null
  }
  const item = path.split('.').reduce((previous, current) => {
    if (previous && current in previous) {
      return previous[current]
    }
  }, object)

  return item
}
