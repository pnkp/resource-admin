export type ClassConstructor<T> = new (...args: any[]) => T;

export type EntityType<TResource = any> = ClassConstructor<TResource> | string;

export class EntityProperty {
  readonly name: string;

  constructor(partial: Partial<EntityProperty>) {
    Object.assign(this, partial);
  }
}

export class EntityName {
  constructor(readonly name: string) {}

  toHumanizeString(): string {
    return this.name;
  }
}

export class Resource {
  readonly name: EntityName;
  readonly entityProperties: EntityProperty[];

  constructor(partial: Partial<Resource>) {
    Object.assign(this, partial);
  }
}
