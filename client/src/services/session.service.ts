import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import {environment} from '../environments/environment';

interface User {
  username:string,
  password:string,
  lenguage:string,
  age:string,
  gender:string,
  error:string
}

@Injectable()
export class SessionService {

  //BASEURL:string = "http://localhost:3000"
  options:object = {withCredentials:true};
  constructor(private http: Http) {
    this.isLoggedIn().subscribe();
  }

  public user:User;

  getUser(){
    return this.user;
  }
  private configureUser(set=false){
    return (user) => {
      if(set){
        this.user = user;
        console.log(`Setting user, welcome ${this.user.username}`)
      }else{
        console.log(`bye bye ${this.user.username}`)
        this.user = null
      }
      return user;
    }
  }

  getUserGender(){
    return this.user.gender=='F'?true:false;
  }

  handleError(e) {
    console.log(e);
    return Observable.throw(e.json().message);
  }

  signup(username:string, password:string,language:string,gender:string,age:string):Observable<any>{
    console.log(username,password,language,gender,age)
    return this.http.post(`${environment.BASEURL}/api/auth/signup`, {username,password,language,gender,age}, this.options)
      .map(res => res.json())
      .map(this.configureUser(true))
      .catch(this.handleError);
  }

  login(username:string, password:string):Observable<any>{
    return this.http.post(`${environment.BASEURL}/api/auth/login`, {username,password},this.options)
      .map(res => res.json())
      .map(this.configureUser(true))
      .catch(this.handleError);
  }

  logout():Observable<any>{
    return this.http.get(`${environment.BASEURL}/api/auth/logout`,this.options)
      .map(res => res.json())
      .map(this.configureUser(false))
      .catch(this.handleError);
  }

  isLoggedIn():Observable<any> {
    return this.http.get(`${environment.BASEURL}/api/auth/loggedin`,this.options)
      .map(res => res.json())
      .map(this.configureUser(true))
      .catch(this.handleError);
  }
}