import { Component, OnInit } from '@angular/core';
import { ClubActivity } from 'src/app/models/ClubActivity/club-activity';
import { Region } from 'src/app/models/Region/region';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { Zone } from 'src/app/models/Zone/zone';
import { ClubActivityServiceService } from 'src/app/shared/services/club-activity-service/club-activity-service.service';
import { RegionService } from 'src/app/shared/services/region/region.service';
import { ZoneService } from 'src/app/shared/services/zone/zone.service';

@Component({
  selector: 'app-manage-club-activities',
  templateUrl: './manage-club-activities.component.html',
  styleUrls: ['./manage-club-activities.component.css']
})
export class ManageClubActivitiesComponent implements OnInit{

  regionList: Region[] = [];
  zoneList: Zone[] = [];
  requestModel = new Request();
  searchParamModel = new SearchParam();
  clubActivityList: ClubActivity[] = [];
  zoneModel = new Zone();

  constructor (private regionService: RegionService, private zoneService: ZoneService
              , private clubActivityService: ClubActivityServiceService) {}

  ngOnInit(): void {
    this.loadAvailableRegionList();
    this.loadClubActivityList();
  }

  loadClubActivityList() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");

    this.clubActivityService.getAllClubActivityList(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachClubActivity: ClubActivity) => {
          this.clubActivityList.push(eachClubActivity);
        })
      }
    })
  }

  onChangeRegion(reCode: any) {
    this.zoneModel.token = sessionStorage.getItem("authToken");
    this.zoneModel.flag = sessionStorage.getItem("role");
    this.zoneModel.regionCode = reCode;

    this.zoneService.getZoneListByReCode(this.zoneModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        dataList.data[0].forEach((eachZone: Zone) => {
          this.zoneList.push(eachZone);
        })
      }
    }, (err) => {})
  }

  loadAvailableRegionList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.regionService.getRegionList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachRegion: Region) => {
          this.regionList.push(eachRegion);
        })
      }
    }, (err) => {})
  }

}
