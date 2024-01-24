import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { PostService } from './services/post.service';
import { CreatePostComponent } from './views/create-post/create-post.component';
import { DetailPostComponent } from './views/detail-post/detail-post.component';
import { HomeComponent } from './views/home/home.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    CreatePostComponent,
    DetailPostComponent,
  ],
  bootstrap: [AppComponent],
  providers: [PostService],
})
export class AppModule {}
