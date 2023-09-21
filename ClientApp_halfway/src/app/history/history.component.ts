import { Component } from '@angular/core';
import { Driver } from '../models/driver.model';
import { Vehicle } from '../models/vehicle.model';
import { Location } from '../models/location.model';
import { VehicleService } from '../services/vehicle.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  drivers: Driver[] = [];
  vehicles: Vehicle[] = [];
  filteredDrivers: Driver[] = this.drivers;
  filteredVehicles: Vehicle[] = this.vehicles;

  constructor(private vehicleService: VehicleService) {
    this.getDrivers();
    this.getVehicles();
  }

  getDrivers() {
    this.vehicleService.getDrivers().subscribe(
      (drivers) => {
        this.drivers = drivers;
        this.filteredDrivers = drivers;
      },
      (error) => {
        console.error('Error fetching drivers:', error);
      }
    );
  }

  getVehicles() {
    this.vehicleService.getAllVehicles().subscribe(
      (vehicles) => {
        this.vehicles = vehicles;
        this.filteredVehicles = vehicles;
      },
      (error) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }

  onSearchDriver(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredDrivers = this.drivers.filter(driver => {
      return driver.name.toLowerCase().includes(query);
    });
  }

  onSearchVehicle(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredVehicles = this.vehicles.filter(vehicle => {
      return vehicle.model.toLowerCase().includes(query) || vehicle.registrationNumber.toLowerCase().includes(query);
    });
  }

  onTrackDriver(driver: Driver) {
    // Implement tracking logic for driver
    const currDriversVehicles: Array<Vehicle> = [];
    const currDriverLocations: Array<Location> = [];

    this.vehicles.forEach(vehicle => {
      if(vehicle.driverId === driver.id) {
        currDriversVehicles.push(_.cloneDeep(vehicle));
        const clonedVehicle: Vehicle = currDriversVehicles[currDriversVehicles.length - 1];

        if(clonedVehicle.location) {
          currDriverLocations.push(clonedVehicle.location);
        }
      }
    });
  }

  onTrackVehicle(vehicle: Vehicle) {
    // Implement tracking logic for vehicle
    const currVehicleDrivers: Array<Driver> = [];
    const currVehicleLocations: Array<Location> = [];

    this.drivers.forEach(driver => {
      if(driver.id === vehicle.driverId) {
        currVehicleDrivers.push(_.cloneDeep(driver));
      }
    });

    if(vehicle.location) {
      currVehicleLocations.push({...vehicle.location});
    }
  }
}
