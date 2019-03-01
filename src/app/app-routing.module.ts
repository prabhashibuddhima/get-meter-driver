import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'menu-items', pathMatch: 'full' },
   //if the auth guard is active it goes to home
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'password-reset', loadChildren: './password-reset/password-reset.module#PasswordResetPageModule',  canActivate: [AuthGuard] },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'trip-complete', loadChildren: './trip-complete/trip-complete.module#TripCompletePageModule',  canActivate: [AuthGuard] },
  { path: 'customer-rate', loadChildren: './customer-rate/customer-rate.module#CustomerRatePageModule',  canActivate: [AuthGuard] },
  { path: 'menu-items', loadChildren: './menu-items/menu-items.module#MenuItemsPageModule' },
  { path: 'qr-code', loadChildren: './qr-code/qr-code.module#QrCodePageModule' },
  { path: '**', redirectTo: 'menu-items' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
