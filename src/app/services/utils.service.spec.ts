import { TestBed } from '@angular/core/testing';

import { Post } from '../models/post';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test createId', () => {
    let postArr: Post[] = [{ id: 0 }];
    let resultId = service.createId(0, postArr);
    expect(resultId).toEqual(1);
  });
});
