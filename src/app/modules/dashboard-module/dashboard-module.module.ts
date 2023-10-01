import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { HomeComponent } from './govener/home/home.component';
import { UserManagementComponent } from './govener/user-management/user-management.component';
import { ChairpersonsComponent } from './govener/chairpersons/chairpersons.component';
import { ContextUsersComponent } from './govener/context-users/context-users.component';
import { EvaluatorsComponent } from './govener/evaluators/evaluators.component';
import { ClubUsersComponent } from './govener/club-users/club-users.component';


@NgModule({
  declarations: [
  
    HomeComponent,
       UserManagementComponent,
       ChairpersonsComponent,
       ContextUsersComponent,
       EvaluatorsComponent,
       ClubUsersComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule
  ]
})
export class DashboardModuleModule { }
