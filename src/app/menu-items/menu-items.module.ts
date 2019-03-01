import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AuthGuard } from '../guards/auth.guard'
import { MenuItemsPage } from './menu-items.page';

const routes: Routes = [
  {
    path: '',
    component: MenuItemsPage,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
         path: 'home',
        loadChildren: '../home/home.module#HomePageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuItemsPage]
})
export class MenuItemsPageModule {}
