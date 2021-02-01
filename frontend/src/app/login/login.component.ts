import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { HttpErrorResponse } from '@angular/common/http'
import { Login } from '../response';
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    userLogged:boolean = false;
    constructor(
        private formBuilder: FormBuilder,
        private userService : UserServiceService,
        private router: Router,
        private toastr: ToastrService
    ) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.userService.login(this.loginForm.value)
        .subscribe(
            (user:Login) => {
                
                if(user.code === 200) {
                    this.toastr.success('Login success');
                    window.localStorage.setItem('token',user.token);
                    window.localStorage.setItem('_id', user.data._id);
                    this.router.navigate(['users']);
                }else {
                    this.toastr.error(user.message);
                    return ;
                }
            },
            (error: HttpErrorResponse) => {
                this.loading = false;
                this.toastr.error(error.error.message);
                return ;
            });
        this.loading = true;
    }
}
