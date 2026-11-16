import * as migration_20261116_205246_init from './20261116_205246_init.ts';

export const migrations = [
  {
    up: migration_20261116_205246_init.up,
    down: migration_20261116_205246_init.down,
    name: '20261116_205246_init'
  },
];
