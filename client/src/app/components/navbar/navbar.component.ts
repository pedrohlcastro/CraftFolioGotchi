import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';

declare const $;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navBarOpen = false;
  isAuthenticated: boolean;
  userId:string;

  constructor(
    private authService: AuthService,
    private router: Router, 
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.authService.loggedIn.subscribe(status => this.isAuthenticated = status);
    this.authService.userIdChange.subscribe(userId => this.userId)
  }

  ngOnInit() {
    this.closeNavBar();
  }

  changeNavBar(param){
    this.navBarOpen = param;
    if(param) {
      this.openNavBar();
    } else {
      this.closeNavBar();
    }
  }

  navToEdit() {
    this.router.navigateByUrl(`/folio/${this.userId}`);
  }

  share() {
    this.dialog.open(ShareDialogComponent, {
      width: '50%'
    });
  }

  logout() {
    this.authService.logout();
  }

  openNavBar(){
    $('.nav-bar').width( '300px' );
    $('#content').css({'margin-left' : '300px'});
    $('.top-header').css({'display' : 'none'});
  }

  closeNavBar(){
    $('.nav-bar').width( '0px' );
    $('#content').css({'margin-left' : '0px'});
    $('.top-header').css({'display' : 'block'});
  }

}
