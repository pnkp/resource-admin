import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  EntityName,
  EntityProperty,
  EntityType,
  Resource,
} from './resource-explorer.types';
import { MapToArrayValues } from './utils';

@Injectable()
export abstract class ResourceExplorer {
  abstract getResources(): Resource[];

  abstract getEntityNames(): EntityName[];

  abstract getResource(entity: EntityType): Resource;
}

export class TypeormResourceExplorer extends ResourceExplorer {
  static create(dataSource: DataSource): ResourceExplorer {
    const resourceMap = new Map();

    dataSource.entityMetadatas.forEach((entityMetadata) => {
      const resource = new Resource({
        name: new EntityName(entityMetadata.name),
        entityProperties: entityMetadata.columns.map(
          (column) =>
            new EntityProperty({
              name: column.propertyName,
            }),
        ),
      });

      resourceMap.set(entityMetadata.name, resource);
    });

    return new TypeormResourceExplorer(resourceMap);
  }

  constructor(private readonly resources: Map<string, Resource>) {
    super();
  }

  getResources(): Resource[] {
    return MapToArrayValues(this.resources);
  }

  getEntityNames(): EntityName[] {
    return MapToArrayValues(this.resources).map((resource) => resource.name);
  }

  getResource(entity: string): Resource {
    const resource = this.resources.get(entity);

    if (!resource) {
      throw new Error(`${resource} doesnt exist`);
    }

    return resource;
  }
}
