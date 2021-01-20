import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm', {static:true}) editForm: NgForm;

  @HostListener('window: beforeunload', ['$event'])
  unloadNotification($event: any){
    if(this.editForm.dirty)
    {
      $event.returnValue = true;
    }
  }
  userInfo: User;
  constructor(private route: ActivatedRoute,private alertify: AlertifyService, private authService: AuthService, private UserService: UserService) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.userInfo = data['userInfo'];
    });
    //console.log(this.userInfo);
  }

  updateUser(){
    this.UserService.updateUser(this.authService.decodedToken.nameid, this.userInfo).subscribe(next=>{
      this.alertify.success("User info updated");
      this.editForm.reset(this.userInfo);
    },error=>{
      this.alertify.error("Failed to update");
    });

  }

}
