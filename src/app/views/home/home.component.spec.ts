import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule],
      declarations: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test ngOnInit - should call getIdFromUrl', () => {
    spyOn(component.post, 'getPosts').and.returnValue(of([{ id: 0 }]));

    component.ngOnInit();

    expect(component.postArr.length).toBeGreaterThan(0);
  });

  it('test newPost - should call getIdFromUrl', () => {
    const call = spyOn(component.router, 'navigateByUrl');

    component.newPost();

    expect(call).toHaveBeenCalled();
  });

  it('test edit - should call getIdFromUrl', () => {
    const call = spyOn(component.router, 'navigateByUrl');

    component.edit(0);

    expect(call).toHaveBeenCalled();
  });

  it('test remove - should call post.deletePost', () => {
    const call = spyOn(component.post, 'deletePost').and.returnValue(
      of({ id: 0 })
    );

    component.remove(0);

    expect(call).toHaveBeenCalled();
  });

  it('test viewPost - should call getIdFromUrl', () => {
    const call = spyOn(component.router, 'navigateByUrl');

    component.viewPost(0);

    expect(call).toHaveBeenCalled();
  });
});
