import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from 'src/app/types/user-type';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-component',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, AfterViewInit {

  users: Array<User> = new Array<User>();

  userToUpdate: User = new User();
  showForm: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly message: ToastrService
  ) { }

  ngOnInit(): void {
    //this.getAllUsers();
  }

  ngAfterViewInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.get().subscribe((users) => this.users = users);
  }

  edit(user: User): void {
    this.userToUpdate = Object.assign({}, user);
    this.showForm = true;
  }

  delete(id: number): void {
    this.userService.delete(id)
      .subscribe(() => {
        this.message.success('The user has been deleted', 'Success!');
      }, () => {
        this.message.error('There was an error', 'Error!');
      });
  }

}
