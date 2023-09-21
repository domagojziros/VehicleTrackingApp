/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/location.model';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  locations: Location[] = [];
  filteredLocations: Location[] = [];
  newLocation: Location = {
    id: 0,
    name: '',
    address: '',
    locationX: 0,
    locationY: 0,
    time: new Date()
  };
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  editLocationId: number | null = null;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this.locationService.getAllLocations().subscribe(
      (locations) => {
        console.log('Received locations:', locations);
        this.locations = locations;
        this.filteredLocations = locations;
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredLocations = this.locations.filter(location => {
      return location.address.toLowerCase().includes(query);
    });
    console.log('Filtered locations:', this.filteredLocations);
  }

  addLocation() {
    this.showAddForm = true;
  }

  onEdit(location: Location) {
    this.editLocationId = location.id;
    this.newLocation = { ...location };
    this.showEditForm = true;
  }

  onDelete(location: Location) {
    if (confirm(`Are you sure you want to delete this location?`)) {
      this.locationService.deleteLocation(location.id).subscribe(() => {
        this.getLocations();
      });
    }
  }

  saveNewLocation() {
    console.log('saveNewLocation called');
    if (this.editLocationId) {
      console.log('Updating location with ID:', this.editLocationId);
      this.locationService.updateLocation(this.editLocationId, this.newLocation).subscribe(
        () => {
          console.log('Location updated successfully');
          this.resetForm();
          this.getLocations(); // This updates locations and filteredLocations
        },
        (error) => {
          console.error('Error updating location:', error);
        }
      );
    } else {
      console.log('Creating new location');
      this.locationService.createLocation(this.newLocation).subscribe(
        () => {
          console.log('Location created successfully');
          this.resetForm();
          this.getLocations(); // This updates locations and filteredLocations
        },
        (error) => {
          console.error('Error creating location:', error);
        }
      );
    }
  }

  resetForm() {
    this.newLocation = {
      id: 0,
      name: '' ,
      address: '',
      locationX: 0,
      locationY: 0,
      time: new Date()
    };
    this.showAddForm = false;
    this.showEditForm = false;
    this.editLocationId = null;
  }

  cancelAddNewLocation() {
    this.resetForm();
  }

  exportLocations() {
    this.locationService.downloadLocations().subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'Locations.txt';
      link.click();
    });
  }
}
