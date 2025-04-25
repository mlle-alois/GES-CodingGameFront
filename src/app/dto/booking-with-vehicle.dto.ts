import {Booking} from '../models/booking.model';
import {Vehicle} from '../models/vehicle.model';

export class BookingWithVehicleDto {
  booking: Booking;
  vehicle: Vehicle;

  constructor(booking: Booking, vehicle: Vehicle) {
    this.booking = booking;
    this.vehicle = vehicle;
  }
}
