import { Injectable } from '@angular/core';
import { config } from '@config/index';
import type { Config } from '@config/index';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config!: Config;

  constructor() {}


  getEntities(): Config['entities'] {
    return config.entities;
  }

  getCategories() {
    return config.categories;
  }
}
