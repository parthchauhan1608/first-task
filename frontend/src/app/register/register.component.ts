import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { HttpErrorResponse } from '@angular/common/http'
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Register,FileUpload } from '../response';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  loading = false;
  submitted = false;

  //Input for navbar
  userLogged:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService : UserServiceService,
    private router : Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }

  submitButton: boolean = false;
  imageUrl:string;
  uploadImage(event){
    this.toastr.warning("Wait for Image processing");
    this.userService.uploadImage(event.target.files[0])
    .subscribe(
      (data: FileUpload) => {
        this.submitButton = true;
        this.imageUrl = data.url;
      },
      error=>{
        this.toastr.error(error.error.message);
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
        return;
    }

    if(this.imageUrl){
      let obj = this.registrationForm.value;
      obj.image = this.imageUrl;

      this.userService.register(obj)
      .pipe(first())
      .subscribe(
          (data: Register) => {
            if(data.code === 200) {
              this.toastr.success('User Register successfully');
              this.router.navigate(['']);
            }
            else{
              this.toastr.error(data.message);
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
    else{
      this.toastr.error("Please try after sometime");
    }
  }
}
