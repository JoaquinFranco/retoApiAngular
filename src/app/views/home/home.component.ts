import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  postArr: Post[] = [];

  constructor(public post: PostService, public router: Router) {}

  ngOnInit(): void {
    this.post.getPosts().subscribe((response) => {
      console.log(response);
      this.postArr = response;
    });
  }

  newPost() {
    this.router.navigateByUrl('/create');
  }

  edit(id: number) {
    this.router.navigateByUrl('/edit/' + id);
  }

  remove(id: number) {
    this.post.deletePost(id).subscribe((response) => {});
  }

  viewPost(id: number) {
    this.router.navigateByUrl('/detail/' + id);
  }
}
