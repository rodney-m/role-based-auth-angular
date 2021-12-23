import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API : string = "http://192.168.10.59:2021/v1"

  requestHeader = new HttpHeaders(
    {"No-Auth" : "True"}
  )

  constructor(private httpClient : HttpClient, private userAuthService : UserAuthService) { }

  public login(loginData : any) {
    return this.httpClient.post(this.PATH_OF_API + "/oauth/token", loginData, {headers : this.requestHeader})
  }


  public forUser(){
    return this.httpClient.get(this.PATH_OF_API + 'forUser', { responseType : 'text'})
  }
  public forAdmin(){
    return this.httpClient.get(this.PATH_OF_API + 'forAdnin', { responseType : 'text'})
  }

  public roleMatch(allowedRoles:any) :boolean{
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles()

    if(userRoles != null && userRoles){
      for(let i = 0; i < userRoles.length ; i++){
        for (let j = 0; j < allowedRoles.length; j++){
          if(userRoles[i].name === allowedRoles[j]){
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
    return isMatch
  }
}