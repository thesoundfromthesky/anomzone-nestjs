import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { config } from '@config/index';
import type { KeyEntity, KeyEntityColumns, EntityColumns } from '@config/index';

@Directive({
  selector: '[appControl]',
})
export class ControlDirective implements OnInit {
  entity!: EntityColumns;
  @Input() entityName!: KeyEntity;

  constructor(
    private readonly el: ElementRef,
    private readonly r2: Renderer2
  ) {}

  ngOnInit(): void {
    this.entity = config.entities[this.entityName] as EntityColumns;
    const id: KeyEntityColumns = this.el.nativeElement.id;
    const nativeElement: HTMLElement = this.el.nativeElement;
    this.r2.setAttribute(
      nativeElement,
      'type',
      id === 'password' ? 'password' : 'text'
    );
    this.r2.setAttribute(
      nativeElement,
      'aria-label',
      this.capitalizeFirstLetter(id)
    );

    this.r2.setAttribute(nativeElement, 'aria-describedby', id + '-help');

    const maxlength = this.entity[id].maxlength;
    if (maxlength) {
      this.r2.setAttribute(
        nativeElement,
        'maxlength',
        (maxlength as unknown) as string
      );
    }

    const minlength = this.entity[id].minlength;
    if (minlength) {
      this.r2.setAttribute(
        nativeElement,
        'minlength',
        (minlength as unknown) as string
      );
    }

    const required = this.entity[id].required;
    if (required) {
      this.r2.setAttribute(nativeElement, 'required', '');
    }

    // FormControl disabled option will take precedence over readonly and disabled attributed
    const readonly = this.entity[id].immutable;
    if (this.el.nativeElement.value && readonly) {
      this.r2.setAttribute(nativeElement, 'readonly', '');
    }
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
