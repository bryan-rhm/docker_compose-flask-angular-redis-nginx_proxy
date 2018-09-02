import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { TweetsComponent } from './tweets/tweets.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import {DataService} from './data.service';
import {NgbModule,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalAlertComponent } from './modal-alert/modal-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    TweetsComponent,
    FooterComponent,
    ModalComponent,
    ModalAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    DataService,
    NgbActiveModal
  ],
  bootstrap: [AppComponent],
  entryComponents:[ModalComponent]
})
export class AppModule { }
