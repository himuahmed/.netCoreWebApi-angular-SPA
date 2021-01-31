import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { User } from '../../_models/User';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  pagination: Pagination;
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value:'male', display: "Males"},{value:'female', display: "Females"}];
  userParams: any = [];

  
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { 
    console.log("Current user = "+this.user);
  }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.users = data['usersResolver'].result;
      this.pagination = data['usersResolver'].pagination;
      console.log(this.pagination);
    });

    /* this.userParams.gender = this.user.gender == 'male' ? 'female' : 'male'; */
    this.userParams.gender = "male";
    this.userParams.minAge = 18;
    this.userParams.maxAge = 100;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getUsers();
  }

  resetFilter(){
    /* this.userParams.gender = this.user.gender == 'male' ? 'female' : 'male'; */
    this.userParams.gender = "male";
    this.userParams.minAge = 18;
    this.userParams.maxAge = 100;
    this.getUsers();

  }

  getUsers(){
    this.userService.getUsers(this.pagination.currentPage,this.pagination.itemsPerPage, this.userParams).subscribe((result: PaginatedResult<User[]>)=>{
      this.users = result.result;
      this.pagination = result.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }



}
