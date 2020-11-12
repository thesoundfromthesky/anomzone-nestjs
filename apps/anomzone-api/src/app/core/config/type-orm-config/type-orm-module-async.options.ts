import { ApiConfigModule } from '../api-config.module';
import { TypeOrmConfigService } from './type-orm-config.service';

export const typeOrmModuleAsyncOptions = {
  imports: [ApiConfigModule],
  useClass: TypeOrmConfigService,
};
