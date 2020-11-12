import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormService, RouterService } from '@ng-util/index';
import { CategoryGroup } from '@config/index';
import type { Post } from '@typeorm/index';
import { take } from 'rxjs/operators';
import { PostsFacadeService } from './posts-facade.service';
@Injectable({
  providedIn: 'root',
})
export class PostsFormService {
  constructor(
    private readonly formService: FormService,
    private readonly postsFacadeService: PostsFacadeService,
    private readonly routerService: RouterService
  ) {}

  getPostsForm(post?: Post): FormGroup {
    const postsForm = this.formService.buildForm(CategoryGroup.Post, post);
    return postsForm;
  }

  onCreate(postsForm: FormGroup) {
    postsForm.markAllAsTouched();

    if (postsForm.valid) {
      this.postsFacadeService
        .dispatchPostsCreate$(postsForm.value)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.routerService.navigateByUrl(
              this.postsFacadeService.getUrl('create')
            );
          },
        });
    }
  }

  onUpdate(postsForm: FormGroup) {
    postsForm.markAllAsTouched();

    if (postsForm.valid) {
      this.postsFacadeService
        .dispatchPostsUpdate$(postsForm.value)
        .pipe(take(1))
        .subscribe(() => {
          this.routerService.navigateByUrl(
            this.postsFacadeService.getUrl('update')
          );
        });
    }
  }

  onDelete(passwordControl: FormControl) {
    if (passwordControl.valid) {
      const extras = {
        body: { password: passwordControl.value },
      };

      this.postsFacadeService
        .dispatchPostsDelete$(undefined, extras)
        .pipe(take(1))
        .subscribe(() => {
          this.routerService.navigateByUrl(
            this.postsFacadeService.getUrl('delete')
          );
        });
    }
  }

  onReset(postsForm: FormGroup, post?: Post) {
    postsForm.reset(post);
  }
}
