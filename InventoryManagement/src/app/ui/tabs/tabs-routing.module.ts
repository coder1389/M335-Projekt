import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewPage } from './overview/overview.page';
import { TabsPage } from './tabs.page';
import { UserPage } from './user/user.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'overview',
        component: OverviewPage
      },
      {
        path: 'user',
        component: UserPage
      },
      {
        path: '',
        redirectTo: '/tabs/overview',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/overview',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
