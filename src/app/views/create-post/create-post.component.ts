import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  post: Post = { id: 0, title: '', body: '' };
  postArr: Post[] = [];
  id?: number;

  constructor(
    private postService: PostService,
    private utils: UtilsService,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  form = this.fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.postService.getPosts().subscribe((response) => {
      this.postArr = response;
    });

    this.getIdFromUrl();
  }

  getIdFromUrl() {
    if (this.router.url !== '/create') {
      this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
        this.id = parseInt(parametros.get('id')!);
        this.postService.getPost(this.id).subscribe((response) => {
          this.post = response;
          this.form.patchValue({
            title: this.post.title,
            content: this.post.body,
          });
        });
      });
    }
  }

  createOrUpdate() {
    let newId = 0;
    this.post = {
      id: this.id ? this.id : this.utils.createId(newId, this.postArr),
      title: this.form.value.title,
      body: this.form.value.content,
    };

    if (this.id) {
      this.postService.updatePost(this.post).subscribe((response) => {
        console.log(response);
        this.goBack();
      });
    } else {
      this.postService.addPost(this.post).subscribe((response) => {
        console.log(response);
        this.goBack();
      });
    }
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }
}
