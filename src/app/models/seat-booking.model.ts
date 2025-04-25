import {Booking} from './booking.model';
import {Seat} from './seat.model';

export interface SeatBooking {
  id: string;
  booking: Booking;
  seat: Seat;
}
