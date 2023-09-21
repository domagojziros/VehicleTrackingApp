import { Driver } from "./driver.model";
import { Location} from "./location.model"

export interface Vehicle {
    id: number;
    model: string;
    registrationNumber: string;
    productionYear: number;
    maxLoadCapacity: number;
    locationX: number;
    locationY: number;
    driverId: number;
    driver: Driver | undefined;
    locationId : number;
    location : Location | undefined;
  }
