import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from './user'


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private http: HttpClient
  ) { }
 

  getAll(token,page,serchBy,sort,order) {
    let headers = new HttpHeaders();
    headers = headers.set('auth_token', token);
    return this.http.get(`http://localhost:8001/user/details?page=${page}&search=${serchBy}&sort=${sort}&order=${order}`, { headers: headers });
  }

  register(user: User) {
    return this.http.post(`http://localhost:8001/user/register`, user);
  }

  login(user: User) {
    console.log("in service")
    return this.http.post(`http://localhost:8001/user/login`, user);
  }

  toggleStatus(_id) {
    let headers = new HttpHeaders();
    const token = window.localStorage.getItem('token');
    headers = headers.set('auth_token', token);
    return this.http.patch(`http://localhost:8001/user/toggleStatus/${_id}`, {}, { headers: headers });
  }

  getById(_id) {
    let headers = new HttpHeaders();
    const token = window.localStorage.getItem('token');
    headers = headers.set('auth_token', token);
    return this.http.get(`http://localhost:8001/user/details/${_id}`, { headers: headers });
  }

  update(_id, data: User) {
    let headers = new HttpHeaders();
    const token = window.localStorage.getItem('token');
    headers = headers.set('auth_token', token);
    return this.http.put(`http://localhost:8001/user/updateUser/${_id}`, data, { headers: headers });
  }

  delete(id: String) {
    return this.http.delete(`/users/${id}`);
  }

  logout() {
    let headers = new HttpHeaders();
    const token = window.localStorage.getItem('token');
    headers = headers.set('auth_token', token);
    return this.http.post(`http://localhost:8001/user/logout`, {}, { headers: headers });
  }

  forgotPassword(email: String) {
    return this.http.get(`http://localhost:8001/user/forgotPassword/${email}`);
  }

  changePassword(_id: String, password: String) {
    return this.http.put(`http://localhost:8001/user/changePassword/${_id}`, { password: password });
  }

  uploadImage(files) {
    let formData = new FormData()
    formData.append('file', files)
    return this.http.post(`http://3.18.139.243:8808/codezeros/uploadFile/common`, formData);
  }
}
