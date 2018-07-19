import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeEditComponent } from './cake-edit.component';

describe('CakeEditComponent', () => {
  let component: CakeEditComponent;
  let fixture: ComponentFixture<CakeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CakeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
