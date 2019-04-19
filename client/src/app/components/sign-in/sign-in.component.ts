import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50)
    ])
  });

  constructor(
    private authService:AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  login(){
    if (this.loginForm.invalid){
      this.snackBar.open("Não foi possível efetuar o login, favor tentar novamente.", 'Fechar', {duration: 3000});
      return;
    }

    const requestUser = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.loginUser(requestUser)
      .subscribe((res) => {
        this.snackBar.open("Login efetuado com sucesso.", 'Fechar', {duration: 3000});
      },
      error => {
        console.log(error.statusText);
        this.snackBar.open("Não foi possível efetuar login, favor tentar novamente.", 'Fechar', {duration: 3000});
      });
  }



}
