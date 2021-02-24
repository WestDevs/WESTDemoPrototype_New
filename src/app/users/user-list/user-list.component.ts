import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/users.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: any;
  public listComplet: any;
  public searchTerm: string;
  public searchValueChanged: Subject<string> = new Subject<string>();

  constructor(private router: Router,
              private service: UserService,
              private toastr: ToastrService,
              private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.getValues();

    this.searchValueChanged.pipe(debounceTime(1000))
    .subscribe(() => {
      this.search();
    });
  }


  private getValues() {

    this.service.getUsers().subscribe(users => {
      this.users = users;
      this.listComplet = users;
      console.log(users);

    });
  }

  public addUser() {
    this.router.navigate(['/user']);
  }

  public editUser(userId: number) {
    this.router.navigate(['/user/' + userId]);
  }

  public deleteUser(userId: number) {
    this.confirmationDialogService.confirm('Atention', 'Do you really want to delete this user?')
      .then(() =>
        this.service.deleteUser(userId).subscribe(() => {
          this.toastr.success('The user has been deleted');
          this.getValues();
        },
          err => {
            this.toastr.error('Failed to delete the user.');
          }))
      .catch(() => '');
  }

  // Use the code below if you want to filter only using the front end;
  // public search() {
  //   const value = this.searchTerm.toLowerCase();
  //   this.books = this.listComplet.filter(
  //     book => book.name.toLowerCase().startsWith(value, 0) ||
  //       book.author.toLowerCase().startsWith(value, 0) ||
  //       book.description.toString().startsWith(value, 0) ||
  //       book.value.toString().startsWith(value, 0) ||
  //       book.publishDate.toString().startsWith(value, 0));
  // }

  public searchUsers() {
    this.searchValueChanged.next();
  }

  private search() {
    if (this.searchTerm !== '') {
      this.service.searchUsers(this.searchTerm).subscribe(user => {
        this.users = user;
      }, error => {
        this.users = [];
      });
    } else {
      this.service.getUsers().subscribe(users => this.users = users);
    }
  }

  
}