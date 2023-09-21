/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private driversUrl = environment.driversUrl;
  private vehiclesUrl = environment.vehiclesUrl; // Added vehicleUrl

  constructor(private http: HttpClient) {}

  createDriver(driverData: any): Observable<any> {
    return this.http.post(this.driversUrl, driverData);
  }

  getAllDrivers(): Observable<any[]> {
    return this.http.get<any[]>(this.driversUrl);
  }

  getDriverById(driverId: number): Observable<any> {
    const url = `${this.driversUrl}/${driverId}`;
    return this.http.get<any>(url);
  }

  updateDriver(driverId: number, driverData: any): Observable<any> {
    const url = `${this.driversUrl}/${driverId}`;
    return this.http.put(url, driverData);
  }

  deleteDriver(driverId: number): Observable<any> {
    const url = `${this.driversUrl}/${driverId}`;
    return this.http.delete(url);
  }

  // Add a new method to get vehicles driven by a driver
  getVehiclesDrivenByDriver(driverId: number): Observable<any[]> {
    const url = `${this.vehiclesUrl}?driverId=${driverId}`;
    return this.http.get<any[]>(url);
  }
}
