import { Inject, Injectable } from '@nestjs/common';
import { RESOURCE_FACADES, ResourceFacadesType } from './resource-facade';

export interface BaseResourceQuery {
  readonly dataSourceName: string;
  readonly resourceName: string;
}

export interface PeristableQuery<TData = Record<any, any>>
  extends BaseResourceQuery {
  readonly data: TData;
}

@Injectable()
export class ResourceService {
  constructor(
    @Inject(RESOURCE_FACADES)
    private readonly resources: ResourceFacadesType,
  ) {}

  async insert<TEntity = Record<any, any>>({
    data,
    dataSourceName,
    resourceName,
  }: PeristableQuery): Promise<TEntity> {
    const facade = this.resources.get(dataSourceName);

    const entity = facade.resourceExplorer.getResource(resourceName);

    await facade.resourceDatabaseAccessor.insert({
      entityName: entity.name.name,
      data,
    });

    return data;
  }
}
