/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locationsUrl = environment.locationsUrl;
  private vehiclesUrl = environment.vehiclesUrl;

  constructor(private http: HttpClient) { }

  createLocation(location: any): Observable<Location> {
    return this.http.post<Location>(this.locationsUrl, location);
  }

  getAllLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.locationsUrl);
  }

  getLocationById(locationId: number): Observable<any> {
    const url = `${this.locationsUrl}/${locationId}`;
    return this.http.get<any>(url);
  }

  updateLocation(locationId: number, locationData: any): Observable<any> {
    const url = `${this.locationsUrl}/${locationId}`;
    return this.http.put(url, locationData);
  }

  deleteLocation(locationId: number): Observable<any> {
    const url = `${this.locationsUrl}/${locationId}`;
    return this.http.delete(url);
  }

  getLocationsForVehicles(vehicleIds: number[]): Observable<Location[]> {
    const url = `${this.vehiclesUrl}/locations?vehicleIds=${vehicleIds.join(',')}`;
    return this.http.get<Location[]>(url);
  }

  downloadLocations(): Observable<Blob> {
    const url = `${this.locationsUrl}/Download`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
