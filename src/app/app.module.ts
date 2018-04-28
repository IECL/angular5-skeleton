import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatStepperModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';


import {AppComponent} from './app.component';
import {DataComponent} from './data/data.component';
import {DataService} from './data/shared/data.service';


@NgModule({
  declarations: [
    AppComponent,
    DataComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatStepperModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [DataService], // name of the service required to pull data if any
  bootstrap: [AppComponent]  // name of the component bootstrapping
})
export class AppModule {
}
