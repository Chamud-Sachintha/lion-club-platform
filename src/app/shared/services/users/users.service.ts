import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChairPerson } from 'src/app/models/ChairPerson/chair-person';
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
}
