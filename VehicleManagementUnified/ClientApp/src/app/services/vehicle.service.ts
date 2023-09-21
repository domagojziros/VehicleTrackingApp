/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from '../models/driver.model';
import { Vehicle } from '../models/vehicle.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private vehiclesUrl = environment.vehiclesUrl;
  private driversUrl = environment.driversUrl;
  private locationsUrl = environment.locationsUrl;

  constructor(private http: HttpClient) { }


  createVehicle(vehicle: any): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.vehiclesUrl, vehicle);
  }


  getAllVehicles(): Observable<any[]> {
    return this.http.get<any[]>(this.vehiclesUrl);
  }


  getVehicleById(vehicleId: number): Observable<any> {
    const url = `${this.vehiclesUrl}/${vehicleId}`;
    return this.http.get<any>(url);
  }


  updateVehicle(vehicleId: number, vehicleData: any): Observable<any> {
    const url = `${this.vehiclesUrl}/${vehicleId}`;
    return this.http.put(url, vehicleData);
  }


  deleteVehicle(vehicleId: number): Observable<any> {
    const url = `${this.vehiclesUrl}/${vehicleId}`;
    return this.http.delete(url);
  }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.driversUrl);
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.locationsUrl);
  }

  getLocationForVehicle(vehicleId: number): Observable<Location> {
    const url = `${this.locationsUrl}/${vehicleId}`;
    return this.http.get<Location>(url);
  }

  downloadVehicles(): Observable<Blob> {
    const url = `${this.vehiclesUrl}/Download`;
    return this.http.get(url, { responseType: 'blob' });
  }
}


