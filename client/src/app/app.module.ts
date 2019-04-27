import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { ColorPickerModule } from 'ngx-color-picker';


import { AppRoutingModule } from './app.module.routes';
import { AppMaterialModule } from './app.module.material';

import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AuthService } from './services/auth.service';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PortifolioComponent } from './components/portifolio/portifolio.component';
import { PetComponent } from './components/pet/pet.component';
import { EditGroundDialogComponent } from './components/edit-ground-dialog/edit-ground-dialog.component';
import { EditBackgroudDialogComponent } from './components/edit-backgroud-dialog/edit-backgroud-dialog.component';
import { LayoutService } from './services/layout.service';
import { EditTextDialogComponent } from './components/edit-text-dialog/edit-text-dialog.component';
import { TextService } from './services/text.service';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    PortifolioComponent,
    PetComponent,
    EditGroundDialogComponent,
    EditBackgroudDialogComponent,
    EditTextDialogComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [
    EditGroundDialogComponent,
    EditBackgroudDialogComponent,
    EditTextDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgImageSliderModule,
    ColorPickerModule,
  ],
  providers: [AuthService, LayoutService, TextService],
  bootstrap: [AppComponent]
})
export class AppModule { }
