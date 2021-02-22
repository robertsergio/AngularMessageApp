import { Injectable } from '@angular/core';
import { Message } from '../model/message.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessageServicesService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'https://message-app-heroku.herokuapp.com/message';
  formData: Message = new Message();
  list: Message[];
  user: string;

  setUser(user: string){
    this.user = user;
  }

  getMessage(id: number) {
    return this.http.get(`${this.baseURL}/view/${id}`);
  }

  postMessage() {
    return this.http.post(`${this.baseURL}/${this.formData.sender}/${this.formData.receiver}?message=${this.formData.message}`, 
      this.formData);
  }

  deleteMessage(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(`${this.baseURL}/${this.user}`)
      .toPromise()
      .then(res =>this.list = res as Message[]);
  }
}
