import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  filterDetailsForm!: FormGroup;
  searchText = '';
  name!: any;
  // dtOptions: DataTables.Settings = {};

  constructor(private reportService: ReportService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers'
    // }
    this.onLoadClubActivityReportTable();
    this.initFilterInfoForm();
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
