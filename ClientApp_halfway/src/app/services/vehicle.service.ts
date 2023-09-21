import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { Driver } from '../models/driver.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'https://localhost:4200/api/Vehicles';
  private driversUrl = 'https://localhost:4200/api/drivers';
  private locationsUrl = 'https://localhost:4200/api/Location' ;

  constructor(private http: HttpClient) { }


  createVehicle(vehicle: any): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.baseUrl, vehicle);
  }


  getAllVehicles(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }


  getVehicleById(vehicleId: number): Observable<any> {
    const url = `${this.baseUrl}/${vehicleId}`;
    return this.http.get<any>(url);
  }


  updateVehicle(vehicleId: number, vehicleData: any): Observable<any> {
    const url = `${this.baseUrl}/${vehicleId}`;
    return this.http.put(url, vehicleData);
  }


  deleteVehicle(vehicleId: number): Observable<any> {
    const url = `${this.baseUrl}/${vehicleId}`;
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


}


