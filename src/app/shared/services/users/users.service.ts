import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChairPerson } from 'src/app/models/ChairPerson/chair-person';
import { ClubUser } from 'src/app/models/ClubUser/club-user';
import { ContextUser } from 'src/app/models/ContextUser/context-user';
import { Evaluvator } from 'src/app/models/Evaluvator/evaluvator';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
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

  getRegionChairPersonData(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "load-re-chairperson-data";
    return this.http.post(path, searchParamModel)
  }

  getEvaluvatorsList(requestMode: Request) {
    const path = environment.apiRoot + "get-evaluvators-list";
    return this.http.post(path, requestMode);
  }

  getClubUsersList(requestModel: Request) {
    const path = environment.apiRoot + "get-club-user-list";
    return this.http.post(path, requestModel);
  }

  getZonalChairPersonInfoByCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "get-zonal-user-info-by-code";
    return this.http.post(path, searchParamModel);
  }

  getContextUserInfoByCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "get-context-user-info-by-code";
    return this.http.post(path, searchParamModel);
  }


  getEvaluvatorInfoByCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "get-evaluvator-info-by-code";
    return this.http.post(path, searchParamModel);
  }

  getClubUserInfoByCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "get-club-user-info-by-code";
    return this.http.post(path, searchParamModel);
  }

  updateRegionChairPersonByCode(chairPersonModel: ChairPerson) {
    const path = environment.apiRoot + "update-reion-chair-user-by-code";
    return this.http.post(path, chairPersonModel)
  }

  activateClubUserByCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "activate-club-user";
    return this.http.post(path, searchParamModel);
  }

  updateZonalChairPersonByCode(chairpersonModel: ChairPerson) {
    const path = environment.apiRoot + "update-zonal-user-by-code";
    return this.http.post(path, chairpersonModel);
  }

  updateContextUserByCode(contextUserMode: ContextUser) {
    const path = environment.apiRoot + "update-context-user-by-code";
    return this.http.post(path, contextUserMode);
  }

  updateEvaluvatorByCode(evaluvatorModel: Evaluvator) {
    const path = environment.apiRoot + "update-evaluvator-by-code";
    return this.http.post(path, evaluvatorModel);
  }

  updateClubUserByCode(clubUserModel: ClubUser) {
    const path = environment.apiRoot + "update-club-user-by-code";
    return this.http.post(path, clubUserModel);
  }

  deleteContextUserByCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "delete-context-user-by-code";
    return this.http.post(path, searchParamModel);
  }

  deleteClubUserByCode(searchParamMode: SearchParam) {
    const path = environment.apiRoot + "delete-club-user-by-code";
    return this.http.post(path, searchParamMode);
  }

  deleteRegionUserByCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "delete-re-user-by-code";
    return this.http.post(path, searchParamModel);
  }

  deleteZoneUserByCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "delete-zone-user-by-code";
    return this.http.post(path, searchParamModel);
  }

  deleteEveluvatorByCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "delete-evaluvator-user-by-code";
    return this.http.post(path, searchParamModel);
  }

  getViewDataListContextUser(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "get-view-data-list-context-user";
    return this.http.post(path, searchParamModel);
  }

  getRCUserCheckInfoPageData(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "get-rc-user-check-info-page-data";
    return this.http.post(path, searchParamModel);
  }

  getZCUserCheckInfoPageData(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "get-zc-user-check-info-page-data";
    return this.http.post(path, searchParamModel);
  }
}
