import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlFactoryService {
  private apiUrl = environment.apiUrl;

  private USER_ENDPOINT = '/user';
  private CONNEXION_ENDPOINT = '/connexion';
  private VEHICLE_ENDPOINT = '/vehicle';
  private BOOKING_ENDPOINT = '/booking';

  constructor() { }

  getLoginUrl(mail: string): string {
    return this.apiUrl + this.USER_ENDPOINT + this.CONNEXION_ENDPOINT + '/' + mail;
  }

  getFutureVehiclesUrl(): string {
    return this.apiUrl + this.VEHICLE_ENDPOINT + '/future';
  }

  getBookingsByUserMailUrl(userMail: string): string {
    return this.apiUrl + this.BOOKING_ENDPOINT + this.USER_ENDPOINT + '/' + userMail;
  }

  getBookedSeatsByVehicleUrl(vehicleId: string): string {
    return this.apiUrl + this.BOOKING_ENDPOINT + this.VEHICLE_ENDPOINT + '/' + vehicleId;
  }
}
