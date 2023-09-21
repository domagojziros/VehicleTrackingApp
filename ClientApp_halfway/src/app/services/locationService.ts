import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = 'https://localhost:4200/api/Location';
  private vehicleUrl = 'https://localhost:4200/api/Vehicles'

  constructor(private http: HttpClient) { }

  createLocation(location: any): Observable<Location> {
    return this.http.post<Location>(this.baseUrl, location);
  }

  getAllLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getLocationById(locationId: number): Observable<any> {
    const url = `${this.baseUrl}/${locationId}`;
    return this.http.get<any>(url);
  }

  updateLocation(locationId: number, locationData: any): Observable<any> {
    const url = `${this.baseUrl}/${locationId}`;
    return this.http.put(url, locationData);
  }

  deleteLocation(locationId: number): Observable<any> {
    const url = `${this.baseUrl}/${locationId}`;
    return this.http.delete(url);
  }
  getLocationsForVehicles(vehicleIds: number[]): Observable<Location[]> {
    const url = `${this.vehicleUrl}/locations?vehicleIds=${vehicleIds.join(',')}`;
    return this.http.get<Location[]>(url);
}

}
