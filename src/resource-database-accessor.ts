import { DataSource } from 'typeorm';

export interface ResourceDatabaseAccessor {
  insert<TEntity = Record<any, any>>(x: {
    entityName: string;
    data: TEntity;
  }): Promise<TEntity>;
}

export class TypeormResourceDatabaseAccessor
  implements ResourceDatabaseAccessor
{
  constructor(private readonly dataSource: DataSource) {}

  async insert<TEntity = Record<any, any>>({
    data,
    entityName,
  }: {
    entityName: string;
    data: TEntity;
  }): Promise<TEntity> {
    const repository = this.dataSource.getRepository(entityName);

    await repository.insert(data);

    return data;
  }
}
