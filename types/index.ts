export interface Indexable {
  [key: string | symbol]: any
}

export type DepsMap = Map<any, Set<() => void>>
export type TargetMap = WeakMap<object, DepsMap>
