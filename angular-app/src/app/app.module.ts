import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NoteService } from './note.service';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CakeService } from './cake.service';
import { CakeDetailsComponent } from './cake-details/cake-details.component';
import { CakeEditComponent } from './cake-edit/cake-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CakeDetailsComponent,
    CakeEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [NoteService, CakeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
