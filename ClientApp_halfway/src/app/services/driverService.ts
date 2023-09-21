import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private baseUrl = 'https://localhost:4200/api/drivers';
  private vehicleUrl = 'https://localhost:4200/api/Vehicles'; // Added vehicleUrl

  constructor(private http: HttpClient) {}

  createDriver(driverData: any): Observable<any> {
    return this.http.post(this.baseUrl, driverData);
  }

  getAllDrivers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getDriverById(driverId: number): Observable<any> {
    const url = `${this.baseUrl}/${driverId}`;
    return this.http.get<any>(url);
  }

  updateDriver(driverId: number, driverData: any): Observable<any> {
    const url = `${this.baseUrl}/${driverId}`;
    return this.http.put(url, driverData);
  }

  deleteDriver(driverId: number): Observable<any> {
    const url = `${this.baseUrl}/${driverId}`;
    return this.http.delete(url);
  }

  // Add a new method to get vehicles driven by a driver
  getVehiclesDrivenByDriver(driverId: number): Observable<any[]> {
    const url = `${this.vehicleUrl}?driverId=${driverId}`;
    return this.http.get<any[]>(url);
  }
}
