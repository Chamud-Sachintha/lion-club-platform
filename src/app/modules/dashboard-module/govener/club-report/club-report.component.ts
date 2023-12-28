import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DashboardTable } from 'src/app/models/DashboardTable/dashboard-table';
import { Report } from 'src/app/models/Report/report';
import { Request } from 'src/app/models/Request/request';
import { ReportService } from 'src/app/shared/services/report/report.service';

@Component({
  selector: 'app-club-report',
  templateUrl: './club-report.component.html',
  styleUrls: ['./club-report.component.css']
})
export class ClubReportComponent implements OnInit {

  dashboardTableList: DashboardTable[] = [];
  cbUserDashboardTableDataList: DashboardTable[] = [];
  reportDataModel = new Report();
  requestParamModel = new Request();

  constructor(private reportService: ReportService, private tostr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.loadReportDataTable();
  }

  onClickDownloadReport() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");

    this.spinner.show();
    this.reportService.exportClubReport(this.requestParamModel).subscribe((resp: any) => {

      if (resp) {
        const blob = new Blob([resp], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'club_report.csv'; // Set the desired file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.tostr.success("Download Report", "Report Download Successfully.");
      } else {
        this.tostr.error("Dwonload Report", 'Error Occured.');
      }

      this.spinner.hide();
    })
  }

  loadReportDataTable() {
    this.reportDataModel.token = sessionStorage.getItem("authToken");
    this.reportDataModel.flag = sessionStorage.getItem("role");

    this.reportService.getClubReportData(this.reportDataModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify((resp)));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachClub: DashboardTable) => {
          this.dashboardTableList.push(eachClub);
        })
      }
    })
  }

}
