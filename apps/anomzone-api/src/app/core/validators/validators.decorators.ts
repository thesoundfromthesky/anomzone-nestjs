import { IsOptional, Length } from 'class-validator';
import { config } from '@config/index';
import type {
  KeyEntity,
  EntityValidators,
  KeyEntityColumns,
} from '@config/index';

export function DtoValidators<T>(entity: KeyEntity, isOptional?: boolean) {
  return (target: T, propertyKey: KeyEntityColumns) => {
    const validators = (config.entities[entity][
      propertyKey
    ] as unknown) as EntityValidators;

    Length(validators.minlength, validators.maxlength)(
      target,
      propertyKey as string
    );
    isOptional && IsOptional()(target, propertyKey as string);
  };
}
