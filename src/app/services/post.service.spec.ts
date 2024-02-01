import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
    }),
      (service = TestBed.inject(PostService));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test getPost: obtenemos post con id 1', () => {
    service.getPost(1).subscribe((response) => {
      expect(response.id).toEqual(1);
    });
  });

  it('test deletePost: se llama a http.delete', () => {
    let call = spyOn(service.http, 'delete');
    service.deletePost(1);
    expect(call).toHaveBeenCalled();
  });

  it('test getPosts: obtenemos un array de posts', () => {
    service.getPosts().subscribe((response) => {
      expect(response.length).toBeGreaterThan(1);
    });
  });

  it('test addPost: se llama a http.post', () => {
    let post = {
      id: 0,
      title: '',
      body: '',
    };
    let call = spyOn(service.http, 'post');
    service.addPost(post);
    expect(call).toHaveBeenCalled();
  });

  it('test updatePost: se llama a http.put', () => {
    let post = {
      id: 0,
      title: '',
      body: '',
    };
    let call = spyOn(service.http, 'put');
    service.updatePost(post);
    expect(call).toHaveBeenCalled();
  });
});
