import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  param
  users
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.param = this.activatedRoute.snapshot.paramMap.get('param')
    this.authService.checkToken().subscribe();
    this.authService.search(decodeURI(this.param)).subscribe((res) => {
      this.users = res;
    })
  }

  goToPage(id) {
    this.router.navigateByUrl(`/folio/${id}`);
  }

}
