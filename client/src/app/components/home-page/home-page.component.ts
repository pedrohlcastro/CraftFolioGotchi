import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  name
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigateByUrl('/sign-in')
  }

  goToSignUp(){
    this.router.navigateByUrl('/sign-up')
  }

  goToSearch() {
    this.router.navigateByUrl(`/search/${encodeURI(this.name)}`)
  }
}
