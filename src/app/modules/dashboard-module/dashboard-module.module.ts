import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
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

import { TagInputModule } from 'ngx-chips';
import { PointTablesComponent } from './govener/point-tables/point-tables.component';

@NgModule({
  declarations: [
  
    HomeComponent,
       UserManagementComponent,
       ChairpersonsComponent,
       ContextUsersComponent,
       EvaluatorsComponent,
       ClubUsersComponent,
       ManageRegionsComponent,
       ManageZonesComponent,
       ManageClubsComponent,
       ActivityMainCategoryComponent,
       ActivityFirstSubCategoryComponent,
       ActivitySecondSubCategoryComponent,
       ActivityComponent,
       ProofDocumentsComponent,
       PointTablesComponent,
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule
  ]
})
export class DashboardModuleModule { }
