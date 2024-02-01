import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CreatePostComponent } from './create-post.component';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
      ],
      declarations: [CreatePostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test ngOnInit - should call getIdFromUrl', () => {
    const call = spyOn(component, 'getIdFromUrl');
    spyOn(component.postService, 'getPosts').and.returnValue(of([{ id: 0 }]));

    component.ngOnInit();

    expect(call).toHaveBeenCalled();
    expect(component.postArr.length).toBeGreaterThan(0);
  });

  describe('test getIdFromUrl: ', () => {
    it('- shouldnt call getSelectedPost', () => {
      component.url = '/create';
      let call = spyOn(component, 'getSelectedPost');

      component.getIdFromUrl();

      expect(call).not.toHaveBeenCalled();
    });
    it('- should call getSelectedPost', () => {
      component.url = '/edit';
      let call = spyOn(component, 'getSelectedPost');

      component.getIdFromUrl();

      expect(call).toHaveBeenCalled();
    });
  });

  it('test getSelectedPost', () => {
    spyOn(component.postService, 'getPost').and.returnValue(
      of({ id: 0, title: '', body: '' })
    );

    component.getSelectedPost(0);

    expect(component.post).toEqual({ id: 0, title: '', body: '' });
    expect(component.form.value.title).toEqual('');
  });

  describe('test createOrUpdate: ', () => {
    it('- should call updatePost and goBack', () => {
      component.id = 1;
      component.form.patchValue({
        title: '',
        content: '',
      });
      let call = spyOn(component.postService, 'updatePost').and.returnValue(
        of({ id: 1 })
      );
      let call2 = spyOn(component, 'goBack').and.callFake(() => {});

      component.createOrUpdate();

      expect(call).toHaveBeenCalled();
      expect(call2).toHaveBeenCalled();
    });
    it('- should call addPost and goBack', () => {
      component.form.patchValue({
        title: '',
        content: '',
      });
      let call = spyOn(component.postService, 'addPost').and.returnValue(
        of({ id: 0 })
      );
      let call2 = spyOn(component, 'goBack').and.callFake(() => {});

      component.createOrUpdate();

      expect(call).toHaveBeenCalled();
      expect(call2).toHaveBeenCalled();
    });
  });

  it('test goBack - should call getIdFromUrl', () => {
    const call = spyOn(component.router, 'navigateByUrl');

    component.goBack();

    expect(call).toHaveBeenCalled();
  });
});
