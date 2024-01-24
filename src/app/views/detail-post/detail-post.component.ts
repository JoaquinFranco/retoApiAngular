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

  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getIdFromUrl();
  }

  getIdFromUrl() {
    if (this.router.url !== '/create') {
      this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
        this.post.id = parseInt(parametros.get('id')!);
        this.postService.getPost(this.post.id).subscribe((response) => {
          this.post = response;
        });
      });
    }
  }

  volver() {
    this.router.navigateByUrl('/home');
  }
}
