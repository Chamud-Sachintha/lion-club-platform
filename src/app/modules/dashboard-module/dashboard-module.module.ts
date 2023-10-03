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
       ManageClubsComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModuleModule { }
