import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user-type';
import { ToastrService } from 'ngx-toastr';
import { Auth } from 'src/app/types/auth-type';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html'
})

export class LoginComponent {

  load: boolean = false;
  isRegister: boolean = false;
  user: User = new User();

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly message: ToastrService
  ) { }

  login(): void {
    this.load = true;
    this.userService.authenticate(this.user.email, this.user.password)
      .subscribe((auth) => {
        this.authenticate(auth);
      }, () => {
        this.message.error('Error!', 'User not found');
        this.load = false;
      });
  }

  register(): void {
    this.load = true;
    this.userService.register(this.user)
      .subscribe((auth) => {
        this.authenticate(auth);
      }, () => {
        this.message.error('An error occurred in user registration', 'Error!');
        this.load = false;
      });
  }

  private authenticate(auth: Auth): void {
    if (auth.allowed) {
      localStorage.setItem('token', auth.token);
      setTimeout(() => {
        this.load = false;
        this.router.navigate(['/dash']);
      }, 1000);
      return;
    }
    this.message.error('An unknown error has occurred', 'Error!');
    this.user = new User();
    this.router.navigate(['/']);
  }

  clean(): void {
    this.isRegister = !this.isRegister;
    this.user = new User();
  }
}
