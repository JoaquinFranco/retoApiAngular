import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DetailPostComponent } from './detail-post.component';

describe('DetailPostComponent', () => {
  let component: DetailPostComponent;
  let fixture: ComponentFixture<DetailPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, RouterModule],
      declarations: [DetailPostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test ngOnInit - should call getIdFromUrl', () => {
    const call = spyOn(component, 'getIdFromUrl');

    component.ngOnInit();

    expect(call).toHaveBeenCalled();
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

    component.getSelectedPost();

    expect(component.post).toEqual({ id: 0, title: '', body: '' });
  });

  it('test volver - should call getIdFromUrl', () => {
    const call = spyOn(component.router, 'navigateByUrl');

    component.volver();

    expect(call).toHaveBeenCalled();
  });
});
