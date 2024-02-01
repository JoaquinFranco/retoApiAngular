import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsUrl: string = 'https://jsonplaceholder.typicode.com/posts';
  constructor(public http: HttpClient) {}

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.postsUrl}/${id}`);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.postsUrl}/${id}`);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postsUrl}?_sort=views&_order=desc`);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.postsUrl}/${post.id}`, post);
  }
}
