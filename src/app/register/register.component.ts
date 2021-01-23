import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registerForm: FormGroup;

  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      confirmPasssword: new FormControl()
    });
  }

  register(){
  /*  this.authService.register(this.model).subscribe(()=>{
      this.alertify.success("Registration Successful.");
    }, error=>{
      this.alertify.error(error);
    }); */

    console.log(this.registerForm.value);
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
