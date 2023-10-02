import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'src/app/models/Auth/auth';
import { Perm } from 'src/app/models/Perm/perm';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticateUser(authInfo: Auth) {
    const path = environment.apiRoot + "authenticateUser";
    return this.http.post(path, authInfo);
  }

  checkMenuPerm(permModel: Perm) {
    const path = environment.apiRoot + "menu-perm";
    return this.http.post(path, permModel);
  }
}
