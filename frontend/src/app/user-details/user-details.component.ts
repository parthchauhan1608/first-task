import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { GetById,GetAll,ToggleStatus } from '../response';
import { HttpErrorResponse } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  data = [];
  userLogged:boolean = true;
  constructor(
    private userService : UserServiceService,
    private toastr: ToastrService,
    private router: Router,
    private route : ActivatedRoute,

  ) { }
  
  userRole:string;
  UserId:string;
  userImage:string;
  blockCreateNewUser = false;
  blockAction = false;
  totalUser:number;
  totalPage:any;
  currentPage:number;
  ngOnInit(): void {
    let token = window.localStorage.getItem('token');
    this.UserId = window.localStorage.getItem('_id')
    this.userService.getById(this.UserId)
    .subscribe(
        (data: GetById) => {
          if(data.code === 200) {
            this.userRole = data.data.role;
            this.userImage = data.data.image;
            if(this.userRole == 'MALE' || this.userRole == 'FEMALE'){
              this.blockCreateNewUser = true;
              this.blockAction = true;
            }
            this.currentPage = this.route.snapshot.params['page'] || 1;
            this.userService.getAll(token,this.currentPage,'','','')
            .subscribe(
                (data: GetAll) => {
                    if(data.code === 200) {
                      this.totalUser = data.count;
                      this.totalPage = this.totalUser/5;
                      if(this.totalPage > parseInt(this.totalPage))
                      {
                        this.totalPage = parseInt(this.totalPage)+1;
                      }
                      this.totalPage = new Array(this.totalPage);
                      this.data = data.data;
                    }else {
                      this.toastr.error(data.message);
                    }
                },
                (error: HttpErrorResponse) => {
                  this.toastr.error(error.error.message);
                });

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

  toggleStatus(_id:string){
    this.userService.toggleStatus(_id)
    .subscribe(
        (data: ToggleStatus) => {
            if(data.code === 200) {
              for ( let i in this.data){
                if(this.data[i]._id == _id){
                  this.data[i].status = !this.data[i].status;
                }
              }
            }else {
              this.toastr.error(data.message);
            }
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(error.error.message);
    });
  }
  orderName:number = 1;
  sortByName(){
    let token = window.localStorage.getItem('token');
    this.userService.getAll(token,this.currentPage,this.search,'name',this.orderName)
    .subscribe(
        (data: GetAll) => {
            if(data.code === 200) {
              this.totalUser = data.count;
              this.totalPage = this.totalUser/5;
              if(this.totalPage > parseInt(this.totalPage))
              {
                this.totalPage = parseInt(this.totalPage)+1;
              }
              this.totalPage = new Array(this.totalPage);
              this.data = data.data;

              if(this.orderName == 1){
                this.orderName = -1;
              }
              else{
                this.orderName = 1;
              }

            }else {
              this.toastr.error(data.message);
            }
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(error.error.message);
        });
  }
  orderEmail:number = 1;
  sortByEmail(){
    let token = window.localStorage.getItem('token');
    this.userService.getAll(token,this.currentPage,this.search,'email',this.orderEmail)
    .subscribe(
        (data: GetAll) => {
            if(data.code === 200) {
              this.totalUser = data.count;
              this.totalPage = this.totalUser/5;
              if(this.totalPage > parseInt(this.totalPage))
              {
                this.totalPage = parseInt(this.totalPage)+1;
              }
              this.totalPage = new Array(this.totalPage);
              this.data = data.data;

              if(this.orderEmail == 1){
                this.orderEmail = -1;
              }
              else{
                this.orderEmail = 1;
              }

            }else {
              this.toastr.error(data.message);
            }
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(error.error.message);
        });
  }

  orderRole:number = 1;
  sortByRole(){
    let token = window.localStorage.getItem('token');
    this.userService.getAll(token,this.currentPage,this.search,'role',this.orderRole)
    .subscribe(
        (data: GetAll) => {
            if(data.code === 200) {
              this.totalUser = data.count;
              this.totalPage = this.totalUser/5;
              if(this.totalPage > parseInt(this.totalPage))
              {
                this.totalPage = parseInt(this.totalPage)+1;
              }
              this.totalPage = new Array(this.totalPage);
              this.data = data.data;

              if(this.orderRole == 1){
                this.orderRole = -1;
              }
              else{
                this.orderRole = 1;
              }

            }else {
              this.toastr.error(data.message);
            }
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(error.error.message);
        });
  }

  search:string = '';
  searchByInput(){
    this.currentPage = 1;
    let token = window.localStorage.getItem('token');
    this.userService.getAll(token,this.currentPage,this.search,'','')
    .subscribe(
        (data: GetAll) => {
            if(data.code === 200) {
              this.totalUser = data.count;
              this.totalPage = this.totalUser/5;
              if(this.totalPage > parseInt(this.totalPage))
              {
                this.totalPage = parseInt(this.totalPage)+1;
              }
              this.totalPage = new Array(this.totalPage);
              this.data = data.data;
            }else {
              this.toastr.error(data.message);
            }
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(error.error.message);
        });
  }
}
