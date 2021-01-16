import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  model: any = {}

  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.model).subscribe(next=>{
      this.alertify.success("Logged in successfully");
      
    }, error => {
      this.alertify.error("Error while logging in");
    });
  }

  loggedIn(){
    return this.authService.IsLoggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this.alertify.message("Logged out successfully");
  }



}
