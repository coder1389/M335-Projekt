import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OverviewPageModule } from './overview/overview.module';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import { UserPageModule } from './user/user.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    OverviewPageModule,
    UserPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
