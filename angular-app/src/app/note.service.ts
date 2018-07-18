import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _http: HttpClient) {
    console.log('NoteServie');
  }

  getNotes() {
    console.log('NoteServie > getNotes');
    return this._http.get('/notes');
  }

  deleteNote(id) {
    return this._http.delete('/notes/' + id);
  }

  create(formData) {
    return this._http.post('/notes', formData);
  }

}
