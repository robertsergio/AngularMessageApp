import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'https://message-app-heroku.herokuapp.com/user';
  formData: User = new User();
  list: User[];


  postUser() {
    return this.http.post(`${this.baseURL}/${this.formData.name}`,this.formData);
  }

  putUser() {
    return this.http.put(`${this.baseURL}/${this.formData.userId}`, this.formData);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as User[]);
  }
}
