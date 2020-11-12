import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Directive, Input } from '@angular/core';

@Directive({
  selector: '[appAnchorScroll]',
})
export class AnchorScrollDirective implements AfterViewInit {
  @Input() id!: string;

  constructor(private readonly viewportScroller: ViewportScroller) {}
  ngAfterViewInit(): void {
    if (this.id) {
      this.viewportScroller.scrollToAnchor(this.id);
    } else {
      throw Error('id attribute required in order to run anchor scroll');
    }
  }
}
