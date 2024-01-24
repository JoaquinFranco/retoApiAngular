import { Injectable } from '@angular/core';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  createId(newId: number, postArr: Post[]): number {
    let existId = false;
    postArr.find((post) => {
      if (post.id === newId) {
        existId = true;
      }
    });
    if(existId) {
      newId++;
      newId = this.createId(newId, postArr);
    }
    return newId;
  }
}
