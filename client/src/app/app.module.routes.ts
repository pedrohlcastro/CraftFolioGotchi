import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PortifolioComponent } from './components/portifolio/portifolio.component';
import { SearchPageComponent } from './components/search-page/search-page.component';


const ROUTES: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'folio/:userId', component: PortifolioComponent},
    { path: 'search/:param', component: SearchPageComponent}
  ];
  
@NgModule({
    imports: [
    RouterModule.forRoot(ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}