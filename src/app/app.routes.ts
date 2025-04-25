import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {BookingPageComponent} from './components/booking-page/booking-page.component';
import {AuthGuard} from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'booking', component: BookingPageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];
