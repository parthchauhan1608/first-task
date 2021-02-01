import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { HttpErrorResponse } from '@angular/common/http'
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ChangePassword } from '../response';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  loading = false;
  changePasswordForm : FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService : UserServiceService,
    private toastr: ToastrService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  
  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      passsword: ['', Validators.required],
      confirm_password: ['', Validators.required]
  });
  }

  submitted = false;
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      this.loading = false;
      return;
    }
    if(this.changePasswordForm.get('passsword').value != this.changePasswordForm.get('confirm_password').value){
      this.loading = false;
      this.toastr.error("Both Password need to be same");
      return ;
    }

    this.userService.changePassword(this.route.snapshot.params['id'],this.changePasswordForm.get('passsword').value)
    .pipe(first())
    .subscribe(
      (data : ChangePassword)=>{
        if(data.code === 200) {
          this.toastr.success(data.message);
          this.loading = false;
          this.router.navigate(['']);
        }else {
            this.toastr.error(data.message);
            return ;
        }
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.toastr.error(error.error.message);
        return ;
    }
    );
  }
  // convenience getter for easy access to form fields
  get f() { return this.changePasswordForm.controls; }
}
