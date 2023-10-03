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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
