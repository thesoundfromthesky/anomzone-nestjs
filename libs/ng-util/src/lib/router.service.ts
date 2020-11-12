import { Injectable } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  ActivatedRoute,
  NavigationExtras,
  UrlTree,
} from '@angular/router';
import { Location } from '@angular/common';
import { filter, map, pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DocumentService } from './document.service';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private readonly documentService: DocumentService
  ) {}

  /**
   * @normalize setting false will remove slash in the beginning, default is true
   */
  getUrl(normalize = true) {
    const path = this.location.path();
    return normalize ? path : path.slice(1);
  }

  getPathname() {
    return this.getUrl().split('?')[0];
  }

  navigateByUrl(url: string | UrlTree, extras?: NavigationExtras | undefined) {
    return this.router.navigateByUrl(url, extras);
  }

  navigate(commands: unknown[], extras?: NavigationExtras | undefined) {
    return this.router.navigate(commands, extras);
  }

  createUrlTree(
    commands: unknown[],
    navigationExtras?: NavigationExtras | undefined
  ) {
    return this.router.createUrlTree(commands, navigationExtras);
  }

  getParamMap(route: ActivatedRoute, paramMapName: string) {
    const id = route.snapshot.paramMap.get(paramMapName);
    if (id) {
      return id;
    } else {
      throw Error('Param not found');
    }
  }

  getQueryParamMap(route: ActivatedRoute, queryParamMapName: string) {
    return route.snapshot.queryParamMap.get(queryParamMapName);
  }

  getLocation() {
    return this.location;
  }
  /**
   * Changes the browser's URL to a normalized version of the given URL, and replaces
   * the top item on the platform's history stack.
   * @param path — URL path to normalize.
   * @param query — Query parameters.
   * @param state — Location history state.
   */
  replaceState(path: string, query?: string | undefined, state?: unknown) {
    this.location.replaceState(path, query, state);
  }

  /**
   * Changes the browser's URL to a normalized version of the given URL, and replaces
   * the top item on the platform's history stack.
   * @param path — URL path to normalize.
   * @param query — Query parameters.
   * @param state — Location history state.
   */
  go(path: string, query?: string | undefined, state?: unknown) {
    this.location.go(path, query, state);
  }
  getResolved(route: ActivatedRoute) {
    return route.data.pipe(pluck('resolved'));
  }

  redirect(url: string) {
    url = this.location.prepareExternalUrl(url);
    this.router.navigateByUrl(url);
  }

  getRedirectUrl(route: ActivatedRoute) {
    const redirectUrl = this.getQueryParamMap(route, 'redirectUrl');
    return redirectUrl ? redirectUrl : '/';
  }

  getState(name: string) {
    return this.router.getCurrentNavigation()?.extras.state?.[name];
  }

  isNavigationEnd$(): Observable<Event> {
    return this.router.events.pipe(
      filter((e: Event) => e instanceof NavigationEnd)
    );
  }

  toNotFound() {
    const url = this.documentService.getUrl();

    this.router.navigateByUrl(`not-found${Date.now()}`, {
      skipLocationChange: true,
    });

    this.location.replaceState(url);
  }

  isLoading$(): Observable<boolean> {
    return this.router.events.pipe(
      filter((e: Event) => {
        const lookupTable = {
          [NavigationStart.name]: true,
          [NavigationEnd.name]: true,
          [NavigationCancel.name]: true,
          [NavigationError.name]: true,
          default: false,
        };
        const name = e.constructor.name;
        return name in lookupTable ? lookupTable[name] : lookupTable.default;
      }),
      map((routerEvent: Event) => {
        if (routerEvent instanceof NavigationStart) {
          return true;
        }
        return false;
      })
    );
  }

  // Get url without parameters
  // https://stackoverflow.com/questions/42504809/get-current-route-without-parameters
  // const url = this.router.routerState.snapshot.url;
  // const urlTree = this.router.parseUrl(url);
  // const urlPath = urlTree.root.children['primary'].segments.map(
  //   (segment) => segment.path
  // );
  // if (this.route.snapshot.paramMap.get('id')) {
  //   urlPath.pop();
  // }
  // this.path = '/' + urlPath.join('/');
  // getPath(): string {
  //   const url = this.router.routerState.snapshot.url;
  //   const urlTree = this.router.parseUrl(url);
  //   const urlPath = urlTree.root.children['primary'].segments.map(
  //     (segment) => segment.path
  //   );
  //   if (this.route.snapshot.paramMap.get('id')) {
  //     urlPath.pop();
  //   }
  //   console.log(this.router.config[1].path);
  //   console.log(this.router);
  //   const path = '/' + urlPath.join('/');
  //   return path;
  // }
}
