import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  isLoggedIn = false;
  emp: any;
  constructor(private http: HttpClient,private authService: AuthService,private userService: UserService,private alertify: AlertifyService) { }

  ngOnInit() { 
    this.getUsers();
  }

  registerToggle(){
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean)
  {
    this.registerMode = registerMode;
  }

  isAuthenticated() {
    this.isLoggedIn = this.authService.IsLoggedIn();
  }

    getUsers(){
    this.userService.gg().subscribe((user: any)=>{
      this.emp = user;
    }, error => {
      this.alertify.error(error);
    });
  } 

}
