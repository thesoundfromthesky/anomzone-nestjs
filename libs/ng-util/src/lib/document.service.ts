import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private r2: Renderer2;
  constructor(
    @Inject(DOCUMENT) private readonly d: Document,
    private readonly rf2: RendererFactory2
  ) {
    this.r2 = this.rf2.createRenderer(null, null);
  }

  getLocation() {
    return this.d.location;
  }
  
  getOrigin() {
    return this.d.location.origin;
  }

  getHost() {
    return this.d.location.host;
  }

  getPathname() {
    return this.d.location.pathname;
  }

  getPort() {
    return this.d.location.port;
  }

  getSearch() {
    return this.d.location.search;
  }

  getUrl() {
    return this.getPathname() + this.getSearch();
  }

  bodyAddClass(name: string): void {
    this.r2.addClass(this.d.body, name);
  }

  bodyRemoveClass(name: string): void {
    this.r2.removeClass(this.d.body, name);
  }

  refreshToHome() {
    const location = this.d.location;
    location.href = location.origin;
  }
}
