import { Controller, Get } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';
import { ApplicationConfig } from './config-module-option';

@Controller('config')
export class ApiConfigController {
  applicationConfig: ApplicationConfig;
  constructor(private readonly apiConfigService: ApiConfigService) {
    this.applicationConfig = this.apiConfigService.get('application');
  }

  @Get()
  getApplicationConfig() {
    return this.applicationConfig;
  }
}
