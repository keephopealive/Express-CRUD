import { CakeService } from './cake.service';
import { NoteService } from './note.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cakes: any = [];
  editCake = null;

  constructor(private _cakeService: CakeService) {
    console.log('AppComponent > Constructor');
    this.getCakes();
  }

  getCakes() {
    console.log('AppComponent > getNotes()');
    const obs = this._cakeService.getCakes();
    obs.subscribe( (serverCakes) => {
      console.log('AppComponent > getTasks() Subscribe');
      console.log(serverCakes);
      this.cakes = serverCakes;
    });
  }

  create(formData) {
    console.log(formData);
    const obs = this._cakeService.createCake(formData);
    obs.subscribe( (serverCake) => {
      this.getCakes();
    });
  }

  createRating(formData, cake_id) {
    console.log(formData, cake_id);
    this._cakeService.createRating(formData, cake_id)
    .subscribe( (rating) => {
      console.log(rating);
      this.getCakes();
    });
  }

}
