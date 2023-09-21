import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplitterModule } from 'primeng/splitter';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { DividerModule } from 'primeng/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { LocationsComponent } from './locations/locations.component';
import { HistoryComponent } from './history/history.component';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiAuthorizationModule } from "../api-authorization/api-authorization.module";


@NgModule({
    declarations: [
        AppComponent,
        LeafletMapComponent,
        VehiclesComponent,
        LocationsComponent,
        HistoryComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ApiAuthorizationModule,
        SplitterModule,
        TabViewModule,
        MenubarModule,
        LeafletModule,
        DividerModule,
        DataViewModule,
        ButtonModule,
        HttpClientModule,
        FormsModule,
        DropdownModule,
        BrowserAnimationsModule,
    ]
})
export class AppModule { }
