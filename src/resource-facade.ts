import { ResourceExplorer } from './resource-explorer';
import { ResourceDatabaseAccessor } from './resource-database-accessor';
import { Injectable } from '@nestjs/common';

export const RESOURCE_FACADES = Symbol();

export type ResourceFacadesType = Map<string, ResourceFacade>;

@Injectable()
export class ResourceFacade {
  constructor(
    readonly name: string,
    readonly resourceExplorer: ResourceExplorer,
    readonly resourceDatabaseAccessor: ResourceDatabaseAccessor,
  ) {}
}
