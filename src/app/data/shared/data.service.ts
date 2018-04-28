import {Injectable} from '@angular/core';
import {DATA} from './mock-data';


@Injectable()
export class DataService {
  getData() {
    return Promise.resolve(DATA);
  }
}
