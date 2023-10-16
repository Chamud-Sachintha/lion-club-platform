import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChairPerson } from 'src/app/models/ChairPerson/chair-person';
import { ClubUser } from 'src/app/models/ClubUser/club-user';
import { ContextUser } from 'src/app/models/ContextUser/context-user';
import { Evaluvator } from 'src/app/models/Evaluvator/evaluvator';
import { Request } from 'src/app/models/Request/request';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  createRegionChairPerson(chairPersonModel: ChairPerson) {
    const path = environment.apiRoot + "addRegionChairperson";
    return this.http.post(path, chairPersonModel);
  }

  createZonalChairPerson(chairPersonModel: ChairPerson) {
    const path = environment.apiRoot + "addZonalChairperson";
    return this.http.post(path, chairPersonModel);
  }

  createContextUser(contextUserModel: ContextUser) {
    const path = environment.apiRoot + "addContextUser";
    return this.http.post(path, contextUserModel);
  }

  createClubUser(clubUserModel: ClubUser) {
    const path = environment.apiRoot + "addClubUser";
    return this.http.post(path, clubUserModel);
  }

  createEvaluator(evaluatortModel: Evaluvator) {
    const path = environment.apiRoot + "addEvaluvator";
    return this.http.post(path, evaluatortModel);
  }

  getRegionChairPersonList(requestModel: Request) {
    const path = environment.apiRoot + "region-chair-person-list";
    return this.http.post(path, requestModel);
  }

  getZonalChairPersonList(requestModel: Request) {
    const path = environment.apiRoot + "get_zonal-chair-person-list";
    return this.http.post(path, requestModel);
  }

  getClubUserInfoByEmail(requestModel: Request) {
    const path = environment.apiRoot + "get-club-user-info";
    return this.http.post(path, requestModel);
  }

  getContextUserList(requestMode: Request) {
    const path = environment.apiRoot + "get-context-user-list";
    return this.http.post(path, requestMode);
  }
}
