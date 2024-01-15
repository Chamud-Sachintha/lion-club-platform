import { Component, OnInit } from '@angular/core';
import { EveluvatorLog } from 'src/app/models/EveluvatorLog/eveluvator-log';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { ClubActivityServiceService } from 'src/app/shared/services/club-activity-service/club-activity-service.service';

@Component({
  selector: 'app-eveluvation-log',
  templateUrl: './eveluvation-log.component.html',
  styleUrls: ['./eveluvation-log.component.css']
})
export class EveluvationLogComponent implements OnInit {

  searchParamModel = new SearchParam();
  eveluvatedLogList: EveluvatorLog[] = [];
  searchText = '';

  constructor(private clubActivityService: ClubActivityServiceService) {}

  ngOnInit(): void {
    this.loadEveluvatorLogList();
  }

  loadEveluvatorLogList() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");

    this.clubActivityService.getEveluvatorLogList(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachData: EveluvatorLog) => {
          const formatedDate = parseInt(eachData.eveluvatedDate) * 1000;
          eachData.eveluvatedDate = formatedDate.toString();

          this.eveluvatedLogList.push(eachData);
        })
      }
    })
  }

}
