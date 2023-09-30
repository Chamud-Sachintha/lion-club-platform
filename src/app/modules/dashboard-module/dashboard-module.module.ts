import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { HomeComponent } from './home/home.component';
import { UserManagementComponent } from './user-management/user-management.component';


@NgModule({
  declarations: [
  
    HomeComponent,
       UserManagementComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule
  ]
})
export class DashboardModuleModule { }
