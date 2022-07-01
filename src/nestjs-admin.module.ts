import { DynamicModule, Module } from '@nestjs/common';
import {
  RESOURCE_FACADES,
  ResourceFacade,
  ResourceFacadesType,
} from './resource-facade';
import { DataSource } from 'typeorm';
import { TypeormResourceExplorer } from './resource-explorer';
import { TypeormResourceDatabaseAccessor } from './resource-database-accessor';
import { RouterModule } from '@nestjs/core';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';

export type TypeormDataSourceOptions = Array<{
  name: string;
  dataSource: DataSource;
}>;

export type NestjsAdminOptions = {
  routePrefix: string;
  resources: TypeormDataSourceOptions;
};

@Module({})
export class NestjsAdminModule {
  static forRootForTypeorm({
    routePrefix,
    resources,
  }: NestjsAdminOptions): DynamicModule {
    return {
      module: NestjsAdminModule,
      imports: [
        RouterModule.register([
          {
            path: routePrefix,
            module: NestjsAdminModule,
          },
        ]),
      ],
      providers: [
        {
          provide: RESOURCE_FACADES,
          useFactory: (): Map<string, ResourceFacade> => {
            const facadesMap: ResourceFacadesType = new Map();

            resources.forEach(({ dataSource, name }) => {
              const facade = new ResourceFacade(
                name,
                TypeormResourceExplorer.create(dataSource),
                new TypeormResourceDatabaseAccessor(dataSource),
              );

              facadesMap.set(name, facade);
            });

            return facadesMap;
          },
        },
        ResourceService,
      ],
      controllers: [ResourceController],
      global: true,
    };
  }
}
