import { EntityType } from './resource-explorer.types';

export function MapToArrayValues<T>(map: Map<any, T>): T[] {
  return Array.from(Object.values(map));
}

export function GetName(entityType: EntityType): string {
  if (typeof entityType === 'string') return entityType;

  return entityType.name;
}
