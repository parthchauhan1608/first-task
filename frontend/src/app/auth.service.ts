import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private JwtHelper : JwtHelperService,
    private  toastr: ToastrService
  ) { }
  
  isAuthenticated():boolean{
    let token = window.localStorage.getItem('token');
    if(!token){
      return false;
    }
    else{
      if(this.JwtHelper.isTokenExpired(token)){
        this.toastr.error("session Timeout Login again");
        localStorage.removeItem('token');
        return false;
      }
      else{
        return true;
      }
    }
  }

  isValidRole():boolean{
    let token = window.localStorage.getItem('token');
    token = this.JwtHelper.decodeToken(token);
    if(token['role'] == 'MALE' || token['role'] == 'FEMALE'){
      return false;
    }
    else{
      return true;
    }
  }

}
