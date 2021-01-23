import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  constructor(private http:HttpClient) { }

  login(model: any){
    return this.http.post(this.baseUrl+"auth/login", model)
    .pipe(map((response :any) => {
      const user = response;
      if(user){
        localStorage.setItem("token", user.token); 
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
      }
    }));
  }

  register(model:User){
    return this.http.post(this.baseUrl+"auth/register", model);
  }

  IsLoggedIn(){
    var token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

} 
