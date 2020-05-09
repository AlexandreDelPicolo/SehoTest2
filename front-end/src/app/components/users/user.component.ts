import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { User, Query } from 'src/app/types/user/user-types';

@Component({
  selector: 'app-user-component',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  users: Array<User> = new Array<User>();

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.apollo.query<Query>({
      query: gql`
        query getUsers {
          getUsers{
            id
            userName
            email
          }
        }
      `
    }).subscribe(res => this.users = res.data.getUsers);
  }
}
