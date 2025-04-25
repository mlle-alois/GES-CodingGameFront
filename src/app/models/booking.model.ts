import {User} from './user.model';
import {SeatBooking} from './seat-booking.model';
import {Vehicle} from './vehicle.model';

export class Booking {
  id: string | undefined;
  user: User;
  validated: boolean;
  bookedSeats: SeatBooking[];

  constructor(id: string | undefined, user: User, validated: boolean, bookedSeats: SeatBooking[]) {
    this.id = id;
    this.user = user;
    this.validated = validated;
    this.bookedSeats = bookedSeats;
  }
}
