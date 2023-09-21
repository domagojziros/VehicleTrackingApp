import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { Location } from '../models/location.model';
import { TokenService } from '../services/token.service';
import { MapComponent } from './map/map.component';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  locations: Location[] = []; // Initialize locations as an array of Location

  isAuthorized$: Observable<boolean>;

  @ViewChild('arcgisMapViewContainer') mapComponent!: MapComponent;

  constructor(
    public tokenService: TokenService,
    public authService: AuthorizeService,
    public authGuard: AuthorizeGuard
    ) {
      this.isAuthorized$ = combineLatest([
        this.authService.isAuthenticated(),
        this.authService.getUserRoles()
      ]).pipe(
        // Map the combined values to a single boolean
        map(([isAuthenticated, userRoles]) => {
          // Replace this with your actual authorization check
          return isAuthenticated && (
            userRoles!.includes('Administrator') || userRoles!.includes('VerifiedUser')
          );
        })
      );
    }

  ngOnInit() {
    this.tokenService.refreshToken();
  }
}
