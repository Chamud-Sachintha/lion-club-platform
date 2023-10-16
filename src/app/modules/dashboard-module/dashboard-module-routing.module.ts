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


      // club user routing starts here

      {
        path: 'submit-activity',
        component: SubmitActivityComponent
      },

      // context user routing starts here

      {
        path: 'feed-data',
        component: FeedActivityDataComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
