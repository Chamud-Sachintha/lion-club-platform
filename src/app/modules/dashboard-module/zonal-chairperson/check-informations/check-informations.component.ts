import { Component, OnInit } from '@angular/core';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { ZCCheckInfoModel } from 'src/app/models/ZCChekInfoModel/zccheck-info-model';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { CommonModule } from '@angular/common';
import { ClubService } from 'src/app/shared/services/club/club.service';
import { Club } from 'src/app/models/Club/club';

@Component({
  selector: 'app-check-informations',
  templateUrl: './check-informations.component.html',
  styleUrls: ['./check-informations.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CheckInformationsComponent implements OnInit {

  searchParamModel = new SearchParam();
  zcUserCheckInfoData: ZCCheckInfoModel[] = [];
  clubList: Club[] = [];

  constructor(private zcPersonService: UsersService, private clubService: ClubService) {}

  ngOnInit(): void {
    this.loadClubListByZoneCode();
    this.loadZonalChairpersonCheckInfoPageData();
  }

  loadClubListByZoneCode() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");

    this.clubService.getClubListByZoneCode(this.searchParamModel).subscribe((resp: any) => {
      
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachClub: Club) => {
          this.clubList.push(eachClub);
        })
      }
    })
  }

  loadZonalChairpersonCheckInfoPageData() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");

    this.zcPersonService.getZCUserCheckInfoPageData(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachData: ZCCheckInfoModel) => {
          this.zcUserCheckInfoData.push(eachData);
        })
      }
    })
  }

}
