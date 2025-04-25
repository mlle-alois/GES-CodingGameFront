import {Component, OnInit} from '@angular/core';
import {Vehicle} from '../../models/vehicle.model';
import {VehicleService} from '../../services/vehicle.service';
import {DatePipe, NgClass, NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Booking} from '../../models/booking.model';
import {User} from '../../models/user.model';
import {BookingWithVehicleDto} from '../../dto/booking-with-vehicle.dto';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  imports: [
    NgClass,
    NgForOf,
    DatePipe
  ],
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.vehicleService.getFutureVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
    });
  }

  async selectVehicle(vehicle: Vehicle): Promise<void> {
    const user = await this.authService.requireUser();
    if(!user) return;

    if (!vehicle.full) {
      const booking: Booking = new Booking(undefined, new User(user.mail), false, []);
      const bookingWithVehicleDto = new BookingWithVehicleDto(booking, vehicle);
      this.router.navigate(['/booking'], {queryParams: {booking: JSON.stringify(bookingWithVehicleDto)}});
    }
  }
}
