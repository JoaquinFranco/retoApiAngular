import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrl: './detail-post.component.css',
})
export class DetailPostComponent implements OnInit {
  post: Post = { id: 0, title: '', body: '' };
  url: string = '';

  constructor(
    public postService: PostService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.url = this.router.url;
    this.getIdFromUrl();
  }

  getIdFromUrl() {
    if (this.url !== '/create') {
      this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
        this.post.id = parseInt(parametros.get('id')!);
        this.getSelectedPost();
      });
    }
  }

  getSelectedPost() {
    this.postService.getPost(this.post.id).subscribe((response) => {
      this.post = response;
    });
  }

  volver() {
    this.router.navigateByUrl('/home');
  }
}
