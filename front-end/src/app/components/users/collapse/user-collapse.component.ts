import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/types/user-type';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-collapse-component',
  templateUrl: './user-collapse.component.html'
})
export class UserCollapseComponent {

  @Input() user: User = new User();
  @Input() show: boolean = false;
  @Output() close = new EventEmitter();

  constructor(
    private readonly userService: UserService,
    private readonly message: ToastrService
  ) { }

  sendAction(user: User): void {
    if (!this.user.id) {
      this.add(user);
      this.cleanForm();
      return;
    }
    this.edit(user);
    this.cleanForm();
  }

  private add(user: User): void {
    this.userService.create(user)
      .subscribe(() => {
        this.message.success('User added successfully', 'Success!');
        this.user = new User();
      }, () => {
        this.message.error('There was an error', 'Error!');
      });
  }

  private edit(user: User): void {
    this.userService.edit(user)
      .subscribe(() => {
        this.message.success('User edited successfully', 'Success!');
        this.user = new User();
      }, () => {
        this.message.error('There was an error', 'Error!');
      });
  }

  buttonText(): string {
    return !this.user.id ? 'Save' : 'Update';
  }

  cleanForm(): void {
    this.user = new User();
    this.close.emit();
  }

}

