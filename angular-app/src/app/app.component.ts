import { NoteService } from './note.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  notes: any = [];

  constructor(private _noteService: NoteService) {
    console.log('AppComponent > Constructor');
    this.getTasks();
  }

  getTasks() {
    console.log('AppComponent > getNotes()');
    const obs = this._noteService.getNotes();
    obs.subscribe( (response) => {
      console.log('AppComponent > getTasks() Subscribe');
      console.log(response);
      this.notes = response;
    });
  }

  deleteNote(id) {
    console.log(id);
    const obs = this._noteService.deleteNote(id);
    obs.subscribe( (response) => {
      console.log('server response:', response);
    });
  }

  create(formData) {
    console.log(formData);
    const obs = this._noteService.create(formData);
    obs.subscribe( (response) => {
      console.log('Response ', response);
      this.getTasks();
    });
  }

}
