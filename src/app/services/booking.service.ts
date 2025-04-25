import {Injectable} from '@angular/core';
import {RestClientService} from './rest-client.service';
import {UrlFactoryService} from './url-factory.service';
import {Observable} from 'rxjs';
import {Booking} from '../models/booking.model';
import {BookingWithVehicleDto} from '../dto/booking-with-vehicle.dto';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private restClient: RestClientService,
              private urlFactory: UrlFactoryService) {
  }

  getBookingsByUserMail(userMail: string): Observable<BookingWithVehicleDto[]> {
    return this.restClient.get<BookingWithVehicleDto[]>(this.urlFactory.getBookingsByUserMailUrl(userMail));
  }

  getBookedSeatsByVehicle(vehicleId: string): Observable<Booking[]> {
    return this.restClient.get(this.urlFactory.getBookedSeatsByVehicleUrl(vehicleId));
  }
}
