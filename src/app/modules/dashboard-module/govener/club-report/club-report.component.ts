import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/models/Report/report';
import { ReportService } from 'src/app/shared/services/report/report.service';

@Component({
  selector: 'app-club-report',
  templateUrl: './club-report.component.html',
  styleUrls: ['./club-report.component.css']
})
export class ClubReportComponent implements OnInit {

  reportDataModel = new Report();

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadReportDataTable();
  }

  loadReportDataTable() {
    this.reportDataModel.token = sessionStorage.getItem("authToken");
    this.reportDataModel.flag = sessionStorage.getItem("role");

    this.reportService.getClubReportData(this.reportDataModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify((resp)));

      if (resp.code === 1) {
        
      }
    })
  }

}
