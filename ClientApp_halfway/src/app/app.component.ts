import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import config from '@arcgis/core/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'VehicleFront';

  ngOnInit() {
    config.apiKey = "AAPK8636e303b15f4645b8e9738091fff655X4_HN5iSSAhP3OyfrLRqEtFUyQwX94dmLV_1D017_7fZ7E55g3zbCT3Nku2tlZ0T";

    const map = new Map({
        basemap: 'topo-vector'
    });

    const view = new MapView({
        container: 'arcgisMapView',
        map: map,
        center: [17.815399, 42.266568],
        zoom: 7.4
    });
  }
}