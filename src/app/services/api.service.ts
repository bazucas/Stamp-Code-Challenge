import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StaticService} from './static.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
              private statics: StaticService) { }

  getAllObjects<T>(action: string): Observable<T> {
    return this.http.get(this.statics.endpoint + '/' + action + '/', {}) as Observable<T> ;
  }

  getObjectById<T>(action: string, id: T): Observable<T> {
    return this.http.get(this.statics.endpoint + '/' + action + '/' + id, {}) as Observable<T> ;
  }

  setNewObject<T, U>(action: string, req: T): Observable<U> {
    return this.http.post(this.statics.endpoint + '/' + action + '/', req) as Observable<U> ;
  }

  updateProperty<T>(action: string, id: number, req: T): Observable<T> {
    return this.http.patch(this.statics.endpoint + '/' + action + '/' + id, req) as Observable<T> ;
  }

  updateObject<T>(action: string, id: number, req: T): Observable<T> {
    return this.http.put(this.statics.endpoint + '/' + action + '/' + id, req) as Observable<T> ;
  }

  deleteObject<T>(action: string, id: number): Observable<T> {
    return this.http.delete(this.statics.endpoint + '/' + action + '/' + id) as Observable<T> ;
  }
}
