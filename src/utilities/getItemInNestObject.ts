export default function getItemInNestObject(path: string, object: Record<string, any>): unknown {
  return path.split('.').reduce((previous, current) => previous[current], object)
}
