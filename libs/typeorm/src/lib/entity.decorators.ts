import { Column } from 'typeorm';
import { config } from '@config/index';
import type { KeyEntity, KeyColumn, EntityValidators } from '@config/index';

// type KeyValidators<T extends KeyEntity> = keyof Entities[T];

// export function ColumnValidators<T, K extends KeyEntity>(entity: K) {
//   return <J extends KeyValidators<K>>(target: T, propertyKey: J) => {
//     const validators = (config.entities[entity][
//       propertyKey
//     ] as unknown) as WidenColumnValidators;

//     // length will set type "varchar" automatically
//     Column({ length: validators.maxlength, update: !validators.immutable })(
//       target,
//       propertyKey as string
//     );
//   };
// }
export function ColumnValidators<T, K extends KeyEntity>(entity: K) {
  return <J extends KeyColumn<K>>(target: T, propertyKey: J) => {
    propertyKey;
    const validators = (config.entities[entity][
      propertyKey
    ] as unknown) as EntityValidators;

    // length will set type "varchar" automatically
    Column({ length: validators.maxlength, update: !validators.immutable })(
      target,
      (propertyKey as unknown) as string
    );
  };
}
