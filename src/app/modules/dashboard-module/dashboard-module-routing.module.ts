import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './govener/home/home.component';
import { UserManagementComponent } from './govener/user-management/user-management.component';
import { ChairpersonsComponent } from './govener/chairpersons/chairpersons.component';
import { ContextUsersComponent } from './govener/context-users/context-users.component';
import { EvaluatorsComponent } from './govener/evaluators/evaluators.component';
import { ClubUsersComponent } from './govener/club-users/club-users.component';
import { ManageRegionsComponent } from './govener/manage-regions/manage-regions.component';
import { ManageZonesComponent } from './govener/manage-zones/manage-zones.component';
import { ManageClubsComponent } from './govener/manage-clubs/manage-clubs.component';
import { ActivityMainCategoryComponent } from './govener/activity-main-category/activity-main-category.component';
import { ActivityFirstSubCategoryComponent } from './govener/activity-first-sub-category/activity-first-sub-category.component';
import { ActivitySecondSubCategoryComponent } from './govener/activity-second-sub-category/activity-second-sub-category.component';
import { ActivityComponent } from './govener/activity/activity.component';
import { ProofDocumentsComponent } from './govener/proof-documents/proof-documents.component';
import { PointTablesComponent } from './govener/point-tables/point-tables.component';
import { SubmitActivityComponent } from './club-user/submit-activity/submit-activity.component';
import { FeedActivityDataComponent } from './context-user/feed-activity-data/feed-activity-data.component';
import { ManageClubActivitiesComponent } from './eveluvator/manage-club-activities/manage-club-activities.component';
import { SubmitNewActivityComponent } from './context-user/submit-new-activity/submit-new-activity.component';
import { CheckInformationsComponent as ReCheckInfoComponent } from './region-chairperson/check-informations/check-informations.component';
import { CheckInformationsComponent as ZonalCheckInfoComponent } from './zonal-chairperson/check-informations/check-informations.component';
import { ReportsComponent } from './govener/reports/reports.component';
import { ClubReportComponent } from './govener/club-report/club-report.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      
      {
        path: 'user-management',
        component: UserManagementComponent
      },

      {
        path: 'manage-chairpersons',
        component: ChairpersonsComponent
      },
      
      {
        path: 'manage-context-users',
        component: ContextUsersComponent
      },

      {
        path: 'manage-evaluators',
        component: EvaluatorsComponent
      },

      {
        path: 'manage-club-users',
        component: ClubUsersComponent
      },

      {
        path: 'manage-regions',
        component: ManageRegionsComponent
      },

      {
        path: 'manage-zones',
        component: ManageZonesComponent
      },

      {
        path: 'manage-clubs',
        component: ManageClubsComponent
      },

      {
        path: 'activity-main-category',
        component: ActivityMainCategoryComponent
      },

      {
        path: 'activity-first-sub-category',
        component: ActivityFirstSubCategoryComponent
      },

    {
        path: 'activity-second-sub-category',
        component: ActivitySecondSubCategoryComponent
      },

      {
        path: 'activity',
        component: ActivityComponent
      },

      {
        path: 'proof-documents',
        component: ProofDocumentsComponent
      },

      {
        path: 'point-tables',
        component: PointTablesComponent
      },

      {
        path: 'gov-reports',
        component: ReportsComponent
      },
      {
        path: 'club-report',
        component: ClubReportComponent
      },


      // club user routing starts here

      {
        path: 'submit-activity',
        component: SubmitActivityComponent
      },

      // context user routing starts here

      {
        path: 'feed-data',
        component: FeedActivityDataComponent
      },
      {
        path: 'feed-new-activity',
        component: SubmitNewActivityComponent
      },

      //eveluvator routings starts here
      {
        path:'manage-lub-activities',
        component: ManageClubActivitiesComponent
      },

      // region chairperson routings starts here
      {
        path: 'region-info-list',
        component: ReCheckInfoComponent
      },

      // zonal chairperson routings starts here
      {
        path: 'zonal-info-list',
        component: ZonalCheckInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
