import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from 'src/app/models/Request/request';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ForgotPwService {

  constructor(private http: HttpClient) { }

  addForgotPwLog(requestParam: Request) {
    const path = environment.apiRoot + "forgot-pw-log";
    return this.http.post(path, requestParam);
  }

  resetPw(requestParamModel: Request) {
    const path = environment.apiRoot + "reset-pw";
    return this.http.post(path, requestParamModel);
  }
}
