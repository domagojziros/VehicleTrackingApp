/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import * as _ from 'lodash';
import { Driver } from '../../models/driver.model';
import { Location } from '../../models/location.model';
import { Vehicle } from '../../models/vehicle.model';
import { TokenService } from '../../services/token.service';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  drivers: Driver[] = [];
  vehicles: Vehicle[] = [];
  filteredDrivers: Driver[] = _.cloneDeep(this.drivers);
  filteredVehicles: Vehicle[] = _.cloneDeep(this.vehicles);

  dialogTrackDriverVisible: boolean = false;
  dialogTrackVehicleVisible: boolean = false;

  driverLocationsArray: Array<Location> = [];
  vehicleLocationsArray: Array<Vehicle> = [];

  currTrackedDriver: Driver | null = null;
  currTrackedVehicle: Vehicle | null = null;

  constructor(
    private vehicleService: VehicleService,
    private tokenService: TokenService
  ) {
    this.getDrivers();
    this.getVehicles();
  }

  getDrivers() {
    console.log("Fetching drivers");
    console.log("Current tokens:");
    console.log(this.tokenService.getToken());

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
    this.currTrackedDriver = driver;
    const currDriverLocations: Array<Location> = [];

    this.vehicles.forEach(vehicle => {
      if (vehicle.driverId === driver.id && vehicle.location) {
        currDriverLocations.push(vehicle.location);
      }
    });

    this.driverLocationsArray = currDriverLocations;
    this.dialogTrackDriverVisible = true;
  }

  onTrackVehicle(vehicle: Vehicle) {
    this.currTrackedVehicle = vehicle;

    if (vehicle.location) {
      this.vehicleLocationsArray.push(vehicle);
    }

    this.dialogTrackVehicleVisible = true;
  }
}
