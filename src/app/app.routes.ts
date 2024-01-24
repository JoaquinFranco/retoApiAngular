import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './views/create-post/create-post.component';
import { DetailPostComponent } from './views/detail-post/detail-post.component';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'create',
    component: CreatePostComponent,
  },
  {
    path: 'edit/:id',
    component: CreatePostComponent,
  },
  {
    path: 'detail/:id',
    component: DetailPostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
