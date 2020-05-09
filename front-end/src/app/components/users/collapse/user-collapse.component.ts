import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/types/user/user-types';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-user-collapse-component',
  templateUrl: './user-collapse.component.html'
})
export class UserCollapseComponent implements OnInit {

  @Input() public user: User = new User();
  isNewUser: boolean = false;
  actionButton: string;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.isNewUser = !this.user.id ? true : false;
    this.actionButton = !this.isNewUser ? 'Save' : 'Update';
  }

  sendAction(user: User): void {

    if (this.isNewUser) {
      this.add(user);
      return;
    }

    this.edit(user);
  }

  private add(user: User): void {
    console.log(user);
  }

  private edit(user: User): void {
    console.log(user);
  }

}

