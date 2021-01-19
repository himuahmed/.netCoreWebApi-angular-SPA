import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { AlertifyService } from './_services/alertify.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './route';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtModule } from '@auth0/angular-jwt';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [							
    AppComponent,
      HeaderComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5001'],
        disallowedRoutes: ['localhost:5001/auth']
      }
    })
     
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
