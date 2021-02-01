import { Component, OnInit,Input } from '@angular/core';
import { Logout } from '../response';
import { UserServiceService } from '../user-service.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() userLogged : boolean;
  @Input() userImage : string;
  constructor(
    private userService : UserServiceService,
    private toastr : ToastrService,
    private router : Router
  ) { }


  ngOnInit(): void {
  }

  logoutUser(){
    this.userService.logout()
    .subscribe(
      (data: Logout)=>{
        if(data.code === 200) {
          this.toastr.success("Logout successfully");
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('_id');
          this.router.navigate(['']);
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

}
