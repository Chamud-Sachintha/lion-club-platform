import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/models/Dashboard/dashboard';
import { DashboardTable } from 'src/app/models/DashboardTable/dashboard-table';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { ClubService } from 'src/app/shared/services/club/club.service';
import { DashboardService } from 'src/app/shared/services/dashboard/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dashboardModel = new Dashboard();
  searchParamModel = new SearchParam();
  dashboardTable = new DashboardTable();
  dashboardTableList: DashboardTable[] = [];
  cntuDashboardTableList: DashboardTable[] = [];
  cbUserDashboardTableDataList: DashboardTable[] = [];
  eveluvatorDashboardTableDataList: DashboardTable[] = [];
  role!: string;

  constructor(private dashboardService: DashboardService, private clubService: ClubService) {}

  ngOnInit(): void {
    this.checkPermisions()

    if (this.role == "G") {
      this.loadGovernerCounts();
    } else if (this.role == "CU") {
      this.loadClubUserCounts();
    } else if (this.role == "CNTU") {
      this.loadContextUserCounts();
    } else if (this.role == "E") {
      this.loadEvaluvatorCounts();
    }

    this.loadUserInfo();
  }

  loadUserInfo() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");

    this.dashboardService.getUserInfo(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        if (this.role == "G") {
          this.dashboardModel.userName = dataList.data[0].first_name + " " + dataList.data[0].last_name;
        } else if (this.role == "CU") {
          this.dashboardModel.userName = dataList.data[0].name;
        } else if (this.role == "CNTU") {
          this.dashboardModel.userName = dataList.data[0].name;
        } else if (this.role == "E") {
          this.dashboardModel.userName = dataList.data[0].name;
        } else if (this.role == "RC") {
          this.dashboardModel.userName = dataList.data[0].name;
        } else if (this.role == "ZC") {
          this.dashboardModel.userName = dataList.data[0].name;
        } else {
          this.dashboardModel.userName = "";
        }
      }
    })
  }

  loadEvaluvatorCounts() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");

    this.dashboardService.getEvaluvatorDashboardData(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        this.dashboardModel.activityCount = dataList.data[0].totalActivities;
        this.dashboardModel.approvedCount = dataList.data[0].approvedCount;
        this.dashboardModel.pendingCount = dataList.data[0].pendingCount;
        this.dashboardModel.rejectedCount = dataList.data[0].rejectedCount;
      }
    })

    this.dashboardService.getEveluvatorDashboardTableData(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachActivity: DashboardTable) => {
          this.eveluvatorDashboardTableDataList.push(eachActivity);
        })
      }
    })
  }

  loadContextUserCounts() {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");

    this.dashboardService.getContextUserDashboardData(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.dashboardModel.totalRegionCount = dataList.data[0].regionCount;
        this.dashboardModel.zoneCount = dataList.data[0].zoneCount;
        this.dashboardModel.activityCount = dataList.data[0].activityCount;
        this.dashboardModel.clubCount = dataList.data[0].clubsCount;
      }
    })

    this.dashboardService.getContextUserDashboardTableData(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        dataList.data[0].forEach((eachRow: DashboardTable) => {
          this.cntuDashboardTableList.push(eachRow);
        })
      }
    })
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

    this.dashboardService.getClubUserDashboardTableData(this.searchParamModel).subscribe((resp: any) => {

      const tableData = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        tableData.data[0].forEach((eachActivity: DashboardTable) => {
          const date = parseInt(eachActivity.createTime) * 1000;
          eachActivity.createTime = date.toString();

          this.cbUserDashboardTableDataList.push(eachActivity)
        })
      }
    })

    this.clubService.getRankOfClub(this.searchParamModel).subscribe((resp: any) => {

      const rankInfo = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        this.dashboardTable.clubRank = rankInfo.data[0].rank;
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

    this.dashboardService.getGovnerDashboardTableData(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachClub: DashboardTable) => {
          this.dashboardTableList.push(eachClub);
        })
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
    } else if (perm == "E") {
      this.role = "E";
    } else {

    }
  }

}
