import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/User';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userModel: User ;
  registerForm: FormGroup;

  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService, private alertify: AlertifyService,private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit() {
   /* this.registerForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, this.comparePasswords); */
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      username: ['',[Validators.required,Validators.minLength(4)]],
      gender: ['male'],
      knownAs:['',Validators.required],
      dateOfBirth:[null,Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
      confirmPassword: ['',[Validators.required,Validators.maxLength(20),Validators.minLength(6)]]
    },{validator: this.comparePasswords});
  }

  register(){
    this.userModel = Object.assign({}, this.registerForm.value);
    this.authService.register(this.userModel).subscribe(()=>{
      this.alertify.success("Registration Successful");
    },error=>{
      this.alertify.error("Couldn't register.")
    },()=>{
      this.authService.login(this.userModel).subscribe(()=>{
        this.router.navigate(['/members']);
      })
    })
  /*  this.authService.register(this.model).subscribe(()=>{
      this.alertify.success("Registration Successful.");
    }, error=>{
      this.alertify.error(error);
    }); */
 
    console.log(this.registerForm.value);
  }
  
  comparePasswords(formGroup: FormGroup){
    return formGroup.get('password').value ===  formGroup.get('confirmPassword').value ? null : {'mismatch': true};
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
