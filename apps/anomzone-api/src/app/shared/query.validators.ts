import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

// take 0 will fetch all data
// take negative not allowed
// skip negative not allowed
// skip out of id range will return empty array
export class FindAllQuery {
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  page!: number;
}
