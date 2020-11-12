import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorsComponent implements OnInit {
  @Input()
  form!: FormGroup;

  @Input()
  controlName!: string;

  constructor() {}

  ngOnInit(): void {}

  isInvalid(errorCode: string) {
    const control = this.form.get(this.controlName);

    if (!control) {
      throw Error(this.controlName + " doesn't exist.");
    }

    if (control.touched) {
      control.markAsDirty();
    }

    return (control.touched || control.dirty) && control.getError(errorCode);
  }
}
