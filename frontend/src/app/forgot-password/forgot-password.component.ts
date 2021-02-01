import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { HttpErrorResponse } from '@angular/common/http'
import { first } from 'rxjs/operators';
import { Forgot } from '../response';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  loading = false;
  submitted = false;
  forgotForm :FormGroup;
    
  //Input for navbar
  userLogged:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService : UserServiceService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.forgotForm.controls; }
  
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.forgotForm.invalid) {
        return;
    }
    this.loading = true;
    this.userService.forgotPassword(this.forgotForm.get('email').value)
    .pipe(first())
    .subscribe(
      (data : Forgot)=>{
        if(data.code === 200) {
          this.toastr.success(data.message);
          this.router.navigate['/'];
          this.loading = false;
        }else {
            this.toastr.error(data.message);
            return ;
        }
      },
      (error: HttpErrorResponse)  => {
        this.loading = false;
        this.toastr.error(error.error.message);
        return ;
    }
    );
  }
}
