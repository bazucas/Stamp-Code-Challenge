import { Injectable } from '@angular/core';
import * as paths from '../../static/paths.json';

@Injectable({
  providedIn: 'root'
})
export class StaticService {

  root = paths.default;
  endpoint = paths.default.endpoint;
}
