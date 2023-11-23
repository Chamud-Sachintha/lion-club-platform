import { Component, OnInit } from '@angular/core';
import { RCCheckInfoModel } from 'src/app/models/RCChekInfoModel/rccheck-info-model';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { Zone } from 'src/app/models/Zone/zone';
import { RegionService } from 'src/app/shared/services/region/region.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { ZoneService } from 'src/app/shared/services/zone/zone.service';

@Component({
  selector: 'app-check-informations',
  templateUrl: './check-informations.component.html',
  styleUrls: ['./check-informations.component.css']
})
export class CheckInformationsComponent implements OnInit {

  zoneModel = new Zone();
  searchParamModel = new SearchParam();
  zoneList: Zone[] = [];
  checkInfoPageData: RCCheckInfoModel[] = [];

  constructor (private zoneService: ZoneService, private reChairPersonService: UsersService) {}

  ngOnInit(): void {
    this.loadUserInfo();
    this.loadZoneByRegionCode();
    this.loadCheckInfoPageData();
  }

  loadCheckInfoPageData() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");

    this.reChairPersonService.getRCUserCheckInfoPageData(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachData: RCCheckInfoModel) => {
          this.checkInfoPageData.push(eachData);
        })
      }
    })
  }

  loadUserInfo() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
  }

  loadZoneByRegionCode() {
    this.zoneModel.token = sessionStorage.getItem("authToken");
    this.zoneModel.flag = sessionStorage.getItem("role");
    this.zoneModel.regionCode = sessionStorage.getItem("reCode");

    this.zoneService.getZoneListByReCode(this.zoneModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachZone: Zone) => {
          this.zoneList.push(eachZone);
        })
      }
    })
  }

}
