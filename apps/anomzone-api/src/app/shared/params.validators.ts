import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export class FindOneParams {
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  id!: number;
}
