import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { SplitterModule } from 'primeng/splitter';
import { TabViewModule } from 'primeng/tabview';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { ApiAuthorizationModule } from "../api-authorization/api-authorization.module";
import { AntiForgeryInterceptor } from './anti-forgery.interceptor';
import { AppComponent } from './app.component';
import { HistoryComponent } from './home/history/history.component';
import { HomeComponent } from './home/home.component';
import { LocationsComponent } from './home/locations/locations.component';
import { MapComponent } from './home/map/map.component';
import { VehiclesComponent } from './home/vehicles/vehicles.component';
import { DriversComponent } from './home/drivers/drivers.component';

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    VehiclesComponent,
    LocationsComponent,
    HistoryComponent,
    MapComponent,
    DriversComponent
  ],
  imports: [
    BrowserModule,
    ApiAuthorizationModule,
    SplitterModule,
    TabViewModule,
    MenubarModule,
    LeafletModule,
    DividerModule,
    DataViewModule,
    ButtonModule,
    HttpClientModule,
    // HttpClientXsrfModule.withOptions({
    //   cookieName: 'XSRF-TOKEN',   // xsrf-token
    //   headerName: 'X-XSRF-TOKEN',
    // }),
    FormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    DialogModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthorizeGuard], runGuardsAndResolvers: 'always'},
    ], { onSameUrlNavigation: 'reload' })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AntiForgeryInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
