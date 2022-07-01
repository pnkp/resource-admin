import { ClassConstructor } from './resource-explorer.types';

export interface PreHook<TEntity = Record<any, any>> {
  preHandle(entity: TEntity): Promise<void>;
}

export interface ValidationHook<TEntity = Record<any, any>> {
  validate(entity: TEntity): Promise<void>;
}

export interface PostHook<TEntity = Record<any, any>> {
  postHandle(entity: TEntity): Promise<void>;
}

export const RegisteredPreHooks = new Map<string, ClassConstructor<any>[]>();

export function RegisterPreHook(entity: ClassConstructor<any>): ClassDecorator {
  return (target) => {
    const hooks = RegisteredPreHooks.get(entity.name) ?? [];
    hooks.push(target as unknown as ClassConstructor<any>);

    RegisteredPreHooks.set(entity.name, hooks);
  };
}
