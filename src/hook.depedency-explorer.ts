import { ModuleRef } from '@nestjs/core';
import { PreHook, RegisteredPreHooks } from './hooks';

export class HookDepedencyExplorer {
  static create(moduleRef: ModuleRef) {
    Object.entries(RegisteredPreHooks).forEach(([entity, preHookToken]) => {});

    const x = moduleRef.get();
  }

  constructor(private readonly preHooks: Map<string, PreHook[]>) {}
}
