import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/models/Report/report';
import { ReportService } from 'src/app/shared/services/report/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reportDataList: Report[] = [];
  reportDataModel = new Report();

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.onLoadClubActivityReportTable();
  }

  onLoadClubActivityReportTable() {
    this.reportDataModel.token = sessionStorage.getItem("authToken");
    this.reportDataModel.flag = sessionStorage.getItem("role");

    this.reportService.getGovernerReportData(this.reportDataModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachRow: Report) => {
          const activityDateFormated = parseInt(eachRow.activityDate) * 1000;
          const submitDateFormated = parseInt(eachRow.submitDate) * 1000;

          eachRow.activityDate = activityDateFormated.toString();
          eachRow.submitDate = submitDateFormated.toString();
          
          this.reportDataList.push(eachRow);
        })
      }
    })
  }

}
