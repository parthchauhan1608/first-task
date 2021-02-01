import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { HttpErrorResponse } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr';
import { GetById,FileUpload,Register,Update } from '../response';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  userLogged:boolean = true;


  action:string;
  userId:string; 

  updateForm: FormGroup;
  submitted = false;
  constructor(
    private userService : UserServiceService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  viewPage:boolean;
  userImage:string;
  userName:string;
  userEmail:string;
  userRole:string;
  
  newUser:boolean = false;

  adminRole:string;
  adminImage:string;
  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required]]
    });

    this.userId = window.localStorage.getItem('_id');
    this.userService.getById(this.userId)
    .subscribe(
        (data: GetById) => {
          if(data.code === 200) {
            this.adminRole = data.data.role;
            this.adminImage = data.data.image;

            if(this.route.snapshot.params['id']){
              this.userService.getById(this.route.snapshot.params['id'])
              .subscribe(
                (data : GetById)=>{
                  if(this.route.snapshot.params['label'] == 'view'){
                    this.viewPage = true;
                    this.userImage = data.data.image;
                    this.userName = data.data.name;
                    this.userEmail = data.data.email;
                    this.userRole = data.data.role;
                  }
                  if(this.route.snapshot.params['label'] == 'edit'){
                    this.viewPage = false;
                    this.userImage = data.data.image;
                    this.updateForm = this.formBuilder.group({
                      name: [data.data.name, Validators.required],
                      email: [data.data.email, Validators.required],
                      role: [data.data.role, Validators.required],
                    });
                  }
                },
                (error: HttpErrorResponse)=>{
                  this.toastr.error(error.error.message);
                }
              );
            }
            else{
              if(this.route.snapshot.params['label'] == 'create'){
                this.newUser = true;
                this.viewPage = false;
                this.updateForm = this.formBuilder.group({
                  name: ['', Validators.required],
                  email: ['', Validators.required],
                  role: ['', Validators.required],
                  password: ['', [Validators.required]]
                });
              }
            }
          }
          else{
            this.toastr.error(data.message);
            return ;
          }
        },
        (error: HttpErrorResponse) => {
            this.toastr.error(error.error.message);
            return ;
        });
  }

  // convenience getter for easy access to form fields
  get f() { return this.updateForm.controls; }

  loading:boolean = false;
  submitButton:boolean = true;
  uploadImage(event){
    this.submitButton = false;
    this.toastr.warning("Wait for Image processing");
    this.userService.uploadImage(event.target.files[0])
    .subscribe(
      (data: FileUpload) => {
        this.submitButton = true;
        this.userImage = data.url;
      },
      error=>{
        this.toastr.error(error.error.message);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.updateForm.invalid) {
        return;
    }

    let obj = this.updateForm.value;
    obj.image = this.userImage;

    if(this.adminRole == 'KING'){
      if(this.updateForm.get('role').value == 'KING'){
        this.toastr.error("You are not eligible to Create This Role");
        return ;
      }
    }
    else if(this.adminRole == "QUEEN"){
      if(this.updateForm.get('role').value == 'KING' || this.updateForm.get('role').value == 'QUEEN'){
        this.toastr.error("You are not eligible to Create This Role");
        return ;
      }
    }

    if(this.newUser){      
      this.userService.register(obj)
      .subscribe(
          (data: Register) => {
            if(data.code === 200) {
              this.toastr.success("User Created");
              this.router.navigate(['/users']);
            }
            else{
              this.toastr.error(data.message);
              return ;
            }
          },
          (error: HttpErrorResponse) => {
              this.toastr.error(error.error.message);
              this.loading = false;
              return ;
          });
      }
      else{
        this.userService.update(this.route.snapshot.params['id'],obj)
        .subscribe(
            (data: Update) => {
              if(data.code === 200) {
                this.toastr.success("Updated successfully");
                this.router.navigate(['/users']);
              }
              else{
                this.toastr.error(data.message);
                return ;
              }
            },
            (error: HttpErrorResponse) => {
              this.toastr.error(error.error.message);
              this.loading = false;
              return ;
            });
        this.loading = true;
      }
  }

}
