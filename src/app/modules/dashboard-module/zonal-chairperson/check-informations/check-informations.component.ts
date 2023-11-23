import { Component, OnInit } from '@angular/core';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { ZCCheckInfoModel } from 'src/app/models/ZCChekInfoModel/zccheck-info-model';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-check-informations',
  templateUrl: './check-informations.component.html',
  styleUrls: ['./check-informations.component.css']
})
export class CheckInformationsComponent implements OnInit {

  searchParamModel = new SearchParam();
  zcUserCheckInfoData: ZCCheckInfoModel[] = [];

  constructor(private zcPersonService: UsersService) {}

  ngOnInit(): void {
    this.loadZonalChairpersonCheckInfoPageData();
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
