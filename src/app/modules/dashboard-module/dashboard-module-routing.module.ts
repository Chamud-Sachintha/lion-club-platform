import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './govener/home/home.component';
import { UserManagementComponent } from './govener/user-management/user-management.component';
import { ChairpersonsComponent } from './govener/chairpersons/chairpersons.component';
import { ContextUsersComponent } from './govener/context-users/context-users.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
