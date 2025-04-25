import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RestClientService} from './rest-client.service';
import {UrlFactoryService} from './url-factory.service';
import {Vehicle} from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private restClient: RestClientService,
              private urlFactory: UrlFactoryService) { }

  getFutureVehicles(): Observable<Vehicle[]> {
    return this.restClient.get(this.urlFactory.getFutureVehiclesUrl());
  }
}
