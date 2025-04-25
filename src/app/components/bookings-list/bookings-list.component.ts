import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import {DatePipe, NgForOf} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {BookingWithVehicleDto} from '../../dto/booking-with-vehicle.dto';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  imports: [
    NgForOf,
    DatePipe
  ],
  styleUrls: ['./bookings-list.component.css']
})
export class BookingsListComponent implements OnInit {
  pendingBookings: BookingWithVehicleDto[] = [];
  pastBookings: BookingWithVehicleDto[] = [];

  constructor(private bookingService: BookingService,
              private authService: AuthService,
              private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.getBookings();
  }

  async getBookings(): Promise<void> {
    const user = await this.authService.requireUser();

    this.bookingService.getBookingsByUserMail(user!.mail).subscribe(bookings => {
      this.pendingBookings = bookings.filter(booking => !booking.booking.validated);
      this.pastBookings = bookings.filter(booking => booking.booking.validated);
    });
  }

  selectBooking(booking: BookingWithVehicleDto): void {
    this.router.navigate(['/booking'], { queryParams: { booking: JSON.stringify(booking) } });
  }
}
