import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html'
})

export class LoginComponent {

  isRegister: boolean = false;

  constructor(private readonly router: Router) { }

  changeButtonlabel(): string {
    return this.isRegister ? 'Register' : 'Sign in';
  }

  isValidAccess(): boolean {
    return true;
  }

  signIn(): void {
    if (!this.isValidAccess())
      return;

    this.router.navigate(['/users']);
  }

}
