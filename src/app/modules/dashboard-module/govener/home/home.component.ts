import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/models/Dashboard/dashboard';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { DashboardService } from 'src/app/shared/services/dashboard/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dashboardModel = new Dashboard();
  searchParamModel = new SearchParam();
  role!: string;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.checkPermisions()

    if (this.role == "G") {
      this.loadGovernerCounts();
    } else if (this.role == "CU") {
      this.loadClubUserCounts();
    } else if (this.role == "CNTU") {
      this.loadContextUserCounts();
    }
  }

  loadContextUserCounts() {
    
  }

  loadClubUserCounts() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.clubCode = sessionStorage.getItem("clubCode");

    this.dashboardService.getClubUserDashboardData(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.dashboardModel.ponitsTotal = dataList.data[0].pointsTotal;
        this.dashboardModel.activityCount = dataList.data[0].activityCount;
      }
    })
  }

  loadGovernerCounts() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    
    this.dashboardService.getGovernerDashboardData(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        this.dashboardModel.activityCount = dataList.data[0].activityCount;
        this.dashboardModel.clubCount = dataList.data[0].clubCount;
      }
    })
  }

  checkPermisions() {
    const perm = sessionStorage.getItem("role");

    if (perm == "G") {
      this.role = "G";
    } else if (perm == "RC") {
      
    } else if (perm == "ZC") {

    } else if (perm == "CNTU") {
      this.role = "CNTU"
    } else if (perm == "CU") {
      this.role = "CU"
    } else {

    }
  }

}
