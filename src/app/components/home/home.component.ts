import {Component, OnInit} from '@angular/core';
import {VehicleListComponent} from '../vehicle-list/vehicle-list.component';
import {LogoutComponent} from '../logout/logout.component';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {BookingsListComponent} from '../bookings-list/bookings-list.component';

@Component({
  selector: 'app-home',
  imports: [
    VehicleListComponent,
    LogoutComponent,
    BookingsListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user: User | null;

  constructor(private authService: AuthService) {
    this.user = null;
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.authService.requireUser();
  }
}
