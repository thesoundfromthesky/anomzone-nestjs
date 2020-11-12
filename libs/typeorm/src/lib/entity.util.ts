import { getMetadataArgsStorage } from 'typeorm';

export function getEntityTarget<T>(name: string) {
  return getMetadataArgsStorage().tables.find((entityMetadata) => {
    return entityMetadata.name === name;
  })?.target as new () => T;
}
