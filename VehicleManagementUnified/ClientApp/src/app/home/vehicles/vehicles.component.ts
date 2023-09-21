import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Driver } from '../../models/driver.model';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  animations: [
    trigger('overlayContentAnimation', [
      state('start', style({
        // Define your starting styles here
      })),
      state('end', style({
        // Define your ending styles here
      })),
      transition('start => end', animate('500ms')),
      // You can define more transitions if needed
    ])
  ]
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  drivers: Driver[] = [];
  locations: Location[] = [];
  newVehicle: Vehicle = {
    id: 0,
    model: '',
    registrationNumber: '',
    productionYear: 0,
    maxLoadCapacity: 0,
    locationX: 0,
    locationY: 0,
    driverId: 0,
    driver: undefined,
    locationId: 0,
    location: undefined
  };
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  editVehicleId: number | null = null;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.getVehicles();
    this.getDrivers();
    this.getLocations();
  }

  getDrivers() {
    this.vehicleService.getDrivers().subscribe(
      (drivers) => {
        console.log('Received drivers:', drivers);
        this.drivers = drivers;
      },
      (error) => {
        console.error('Error fetching drivers:', error);
      }
    );
  }

  getLocations() {
    this.vehicleService.getLocations().subscribe(
      (locations) => {
        console.log('Received locations:', locations);
       this.locations = locations;
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  getVehicles() {
    this.vehicleService.getAllVehicles().subscribe(
      (vehicles) => {
        console.log('Received vehicles:', vehicles);
        this.vehicles = vehicles;
        this.filteredVehicles = vehicles;
      },
      (error) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredVehicles = this.vehicles.filter(vehicle => {
      return vehicle.model.toLowerCase().includes(query) || vehicle.registrationNumber.toLowerCase().includes(query);
    });
    console.log('Filtered vehicles:', this.filteredVehicles);
  }

  addVehicle() {
    this.showAddForm = true;
  }

  onEdit(vehicle: Vehicle) {
    this.editVehicleId = vehicle.id;
    this.newVehicle = { ...vehicle };
    this.newVehicle.locationId = vehicle.locationId;
    this.showEditForm = true;
  }


  onDelete(vehicle: Vehicle) {
    if (confirm(`Are you sure you want to delete the vehicle with registration number ${vehicle.registrationNumber}?`)) {
      this.vehicleService.deleteVehicle(vehicle.id).subscribe(() => {
        this.getVehicles();
      });
    }
  }

  saveNewVehicle() {
    console.log('saveNewVehicle called');

    // Update Location and Driver ids, check constraints
    if(this.newVehicle.location === undefined || this.newVehicle.driver === undefined) {
      alert("Please select a driver and a location!!!");
      return;
    }

    this.newVehicle.driverId = this.newVehicle.driver.id;
    this.newVehicle.locationId = this.newVehicle.location.id;

    if (this.editVehicleId) {
      console.log('Updating vehicle with ID:', this.editVehicleId);
      this.vehicleService.updateVehicle(this.editVehicleId, this.newVehicle).subscribe(
        () => {
          console.log('Vehicle updated successfully');
          this.resetForm();
          this.getVehicles();
        },
        (error) => {
          if (error.status === 400 && error.error.errors) {
            const validationErrors = error.error.errors;
            console.log('Validation errors:', validationErrors);
          } else {
            console.error('Error updating vehicle:', error);
          }
        }
      );
    } else {
      console.log('Creating new vehicle:');
      console.log(this.newVehicle);
      this.vehicleService.createVehicle(this.newVehicle).subscribe(
        () => {
          console.log('Vehicle created successfully');
          this.resetForm();
          this.getVehicles();
        },
        (error) => {
          if (error.status === 400 && error.error.errors) {
            const validationErrors = error.error.errors;
            console.log('Validation errors:', validationErrors);
          } else {
            console.error('Error creating vehicle:', error);
          }
        }
      );
    }
  }

  resetForm() {
    this.newVehicle = {
      id: 0,
      model: '',
      registrationNumber: '',
      productionYear: 0,
      maxLoadCapacity: 0,
      locationX: 0,
      locationY: 0,
      driverId: 0,
      driver: undefined,
      locationId: 0,
      location: undefined
    };
    this.showAddForm = false;
    this.showEditForm = false;
    this.editVehicleId = null;
  }

  cancelAddNewVehicle() {
    this.resetForm();
  }

  exportVehicles() {
    this.vehicleService.downloadVehicles().subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'Vehicles.txt';
      link.click();
    });
  }
}
