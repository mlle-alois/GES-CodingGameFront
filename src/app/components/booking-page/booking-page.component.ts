import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Vehicle} from '../../models/vehicle.model';
import {BookingService} from '../../services/booking.service';
import {SeatState} from '../../models/seat-state.model';
import {Seat} from '../../models/seat.model';
import {SeatBooking} from '../../models/seat-booking.model';
import {SeatPosition} from '../../models/enums/seat-position.enum';
import {BookingWithVehicleDto} from '../../dto/booking-with-vehicle.dto';

@Component({
  selector: 'app-booking-page',
  imports: [
    NgClass,
    NgForOf,
    DatePipe,
    NgIf
  ],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css'
})
export class BookingPageComponent implements OnInit {

  booking!: BookingWithVehicleDto;
  seats: Seat[] = [];
  groupedSeats: (Seat | null)[][] = [];
  bookedSeats: SeatBooking[] = [];
  mySeats: Seat[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bookingService: BookingService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (!params['booking']) {
        this.backHome();
        return;
      }
      this.booking = JSON.parse(params['booking']);
      this.seats = this.booking.vehicle.seats;
      this.mySeats = this.booking.booking.bookedSeats.map(bookedSeat => bookedSeat.seat);
      this.initBookedSeats(this.booking.vehicle);

      this.groupSeatsByRows();
    });
  }

  private groupSeatsByRows() {
    const rowMap = new Map<string, Seat[]>();

    this.seats.forEach(seat => {
      if (!rowMap.has(seat.row)) {
        rowMap.set(seat.row, []);
      }
      rowMap.get(seat.row)!.push(seat);
    });

    this.groupedSeats = Array.from(rowMap.values()).map(rowSeats => {
      return rowSeats.sort((a, b) => a.column - b.column)
        .flatMap((seat, index, arr) =>
          seat.seatPosition === SeatPosition.LEFT_AISLE ? [seat, null] : [seat]
        );
    });
  }

  getSeatState(seat: Seat): SeatState {
    return this.bookedSeats.some(booked => booked.seat === seat)
      ? SeatState.RESERVED
      : this.mySeats.includes(seat)
        ? SeatState.SELECTED
        : SeatState.AVAILABLE;
  }

  reserveSeat(seat: Seat) {
    if (this.getSeatState(seat) === SeatState.RESERVED) return;
    if (this.getSeatState(seat) === SeatState.SELECTED) {
      this.mySeats = this.mySeats.filter(removedSeat => removedSeat !== seat);
    } else {
      this.mySeats.push(seat);
    }
  }

  initBookedSeats(vehicle: Vehicle): void {
    this.bookingService.getBookedSeatsByVehicle(vehicle.id).subscribe(bookings => {
      bookings.forEach(booking => {
        booking.bookedSeats.forEach(bookedSeat => {
          this.bookedSeats.push(bookedSeat);
        })
      });
      // for (let index = 0; index < bookings.length; index++) {
      //   const seat = bookings[index];
      //   const isMine = this.booking.bookedSeats.includes(seat);
      //
      //   this.bookedSeats.set(seat, isMine);
      // }
    });
  }

  confirmBooking(): void {
    // TODO
  }

  backHome() {
    this.router.navigate(['/home']);
  }

  protected readonly SeatState = SeatState;
}
