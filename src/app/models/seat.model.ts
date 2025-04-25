import {Vehicle} from './vehicle.model';
import {SeatPosition} from './enums/seat-position.enum';

export interface Seat {
  id: string;
  vehicle: Vehicle;
  row: string;
  column: number;
  seatPosition: SeatPosition;
}
