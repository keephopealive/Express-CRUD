import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cake-edit',
  templateUrl: './cake-edit.component.html',
  styleUrls: ['./cake-edit.component.css']
})
export class CakeEditComponent implements OnInit {
  @Input() editableCake;

  constructor() { }

  ngOnInit() {
  }

}
