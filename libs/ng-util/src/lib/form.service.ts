import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import type { FormGroup, ValidatorFn } from '@angular/forms';
import { config } from '@config/index';
import type { KeyEntity, EntityValidators, EntityColumns } from '@config/index';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private readonly fb: FormBuilder) {}

  buildValidators(column: EntityValidators): ValidatorFn[] {
    const validators = [];

    if (column.maxlength) {
      validators.push(Validators.maxLength(column.maxlength));
    }

    if (column.minlength) {
      validators.push(Validators.minLength(column.minlength));
    }

    if (column.required) {
      validators.push(Validators.required);
    }

    return validators;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildForm(entity: KeyEntity, data?: any): FormGroup {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formGroup: any = {};

    for (const [column, validators] of Object.entries(
      config.entities[entity] as EntityColumns
    )) {
      const controlDefault = {
        value: data?.[column] ?? '',
        disabled: data?.[column] && validators.immutable,
      };

      formGroup[column] = [controlDefault, this.buildValidators(validators)];
    }

    return this.fb.group(formGroup);
  }
}
