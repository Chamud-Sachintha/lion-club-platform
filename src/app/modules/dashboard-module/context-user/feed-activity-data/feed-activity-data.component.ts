import { Component, OnInit } from '@angular/core';
import { ClubActivity } from 'src/app/models/ClubActivity/club-activity';
import { Region } from 'src/app/models/Region/region';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { Zone } from 'src/app/models/Zone/zone';
import { ClubActivityServiceService } from 'src/app/shared/services/club-activity-service/club-activity-service.service';
import { RegionService } from 'src/app/shared/services/region/region.service';
import { ZoneService } from 'src/app/shared/services/zone/zone.service';

@Component({
  selector: 'app-feed-activity-data',
  templateUrl: './feed-activity-data.component.html',
  styleUrls: ['./feed-activity-data.component.css']
})
export class FeedActivityDataComponent implements OnInit {

  regionModel = new Region();
  zoneModel = new Zone();
  regionList: Region[] = [];
  zoneList: Zone[] = [];
  clubActivityList: ClubActivity[] = [];
  searchParamModel = new SearchParam();

  constructor(private regionService: RegionService, private zoneService: ZoneService, private clubActivityService: ClubActivityServiceService) {}

  ngOnInit(): void {
    this.loadRegionListByUserCode();
    this.loadClubActivityList();
  }

  loadClubActivityList() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    
    this.clubActivityService.getClubActivityList(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachActivity: ClubActivity) => {
          this.clubActivityList.push(eachActivity)
        })
      }
    }, (err) => {})
  }

  onChangeRegion(value: string) {
    this.zoneList = []
    this.zoneModel.token = sessionStorage.getItem("authToken");
    this.zoneModel.flag = sessionStorage.getItem("role");
    this.zoneModel.regionCode = value;

    this.zoneService.getZoneListByReCode(this.zoneModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((zone: Zone) => {
          this.zoneList.push(zone)
        })
      }
    }, (err) => {})
  }

  loadRegionListByUserCode() {
    this.regionModel.token = sessionStorage.getItem("authToken");
    this.regionModel.flag = sessionStorage.getItem("role");

    this.regionService.getRegionListByUserCode(this.regionModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((region: Region) => {
          this.regionList.push(region);
        })
      }
    }, (err) => {})
  }

}
