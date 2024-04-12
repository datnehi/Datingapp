import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Dating App';
  users: any;

  constructor( private accountService: AccountService ){};

  ngOnInit(){
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString: string | null = localStorage.getItem('user');
    if (userString !== null) {
      const user: User = JSON.parse(userString);
      this.accountService.setCurrentUser(user);
    }
  }

}
