import {VehicleType} from './enums/vehicle-type.enum';
import {Seat} from './seat.model';

export interface Vehicle {
  id: string;
  type: VehicleType;
  departureAddress: string;
  arrivalAddress: string;
  departureDate: Date;
  arrivalDate: Date;
  totalSlot: number;
  leftSlot: number;
  full: boolean;
  seats: Seat[];
}
