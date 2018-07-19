import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CakeService {

  constructor(private _http: HttpClient) { }

  getCakes() {
    return this._http.get('/cakes');
  }

  createCake(formData) {
    return this._http.post('/cakes', formData);
  }

  createRating(formData, cake_id) {
    return this._http.put('/cakes/' + cake_id + '/rating', formData);
  }

}

