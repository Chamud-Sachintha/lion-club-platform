import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Report } from 'src/app/models/Report/report';
import { Request } from 'src/app/models/Request/request';
import { ReportService } from 'src/app/shared/services/report/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reportDataList: Report[] = [];
  reportDataModel = new Report();
  filterDetailsForm!: FormGroup;
  requestParamModel = new Request();
  searchText = '';
  name!: any;
  // dtOptions: DataTables.Settings = {};

  constructor(private reportService: ReportService, private formBuilder: FormBuilder, private tostr: ToastrService,
              private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers'
    // }
    this.onLoadClubActivityReportTable();
    this.initFilterInfoForm();
  }

  onClickGenerateExcelSheet() {

    this.requestParamModel.token = sessionStorage.getItem("authToken");
    this.requestParamModel.flag = sessionStorage.getItem("role");

    this.spinner.show();
    this.reportService.exportActivityReport(this.requestParamModel).subscribe((resp: any) => {

      if (resp) {
        const blob = new Blob([resp], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'activity_report.csv'; // Set the desired file name
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

  initFilterInfoForm() {
    this.filterDetailsForm = this.formBuilder.group({
      code: ['', Validators.required],
      activityName: ['', Validators.required]
    })
  }

  onSubmitFilterValusForm() {
    const activityCode = this.filterDetailsForm.controls['code'].value;
    const activityName = this.filterDetailsForm.controls['activityName'].value;

    
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
