import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(
    private readonly router: Router
  ) { }

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
