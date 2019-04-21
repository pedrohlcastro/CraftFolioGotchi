import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';


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

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    PortifolioComponent,
    PetComponent,
    EditGroundDialogComponent
  ],
  entryComponents: [
    EditGroundDialogComponent,
  ],
  imports: [
  BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgImageSliderModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
