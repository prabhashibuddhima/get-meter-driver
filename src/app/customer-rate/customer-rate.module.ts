import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CustomerRatePage } from './customer-rate.page';
import { AppRate } from '@ionic-native/app-rate';

const routes: Routes = [
  {
    path: '',
    component: CustomerRatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CustomerRatePage]
})
export class CustomerRatePageModule {}
