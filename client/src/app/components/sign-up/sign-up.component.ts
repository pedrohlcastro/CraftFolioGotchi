import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private snackBar: MatSnackBar, 
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.checkToken().subscribe();
  }
  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50)
    ])
  }, this.passwordMatchValidator);

  passwordMatchValidator(g: FormGroup) {
    if (g.get('password').value === g.get('confirmPassword').value){
      g.get('confirmPassword').setErrors(null);
      return null;
    }
    else {
      g.get('confirmPassword').setErrors({MatchPassword: true});
      return {'MatchPassword': true}
    }
  }
 
  register(){
    if (this.registerForm.invalid){
      this.snackBar.open("Não foi possível efetuar cadastro, favor tentar novamente.", 'Fechar', {duration: 3000});
      return;
    }
    const requestUser = {
      name: this.registerForm.get('name').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
    };
    this.authService.createUser(requestUser)
      .subscribe((res) => {
        this.snackBar.open("Usuário cadastrado com sucesso.", 'Fechar', {duration: 3000});
        this.router.navigateByUrl('/sign-in');
      },
      error => {
        if (error._body.includes("already exists"))
          this.snackBar.open("O e-mail já existe, favor inserir um diferente.", 'Fechar', {duration: 3000});
        else
          this.snackBar.open("Não foi possível efetuar cadastro, favor tentar novamente.", 'Fechar', {duration: 3000});
      });
  }
}
