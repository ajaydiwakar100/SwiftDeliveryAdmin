import { Component, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader, MouseEvent, AgmMap, LatLngBounds, LatLngBoundsLiteral } from '@agm/core';
import { LocationsService } from './locations.service';
import { MapsService } from './maps.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [LocationsService, MapsService]
})
export class MapGoogleComponent implements OnInit {

  public lat: any;
  public lng: any;
  public zoom: number;
  markers: any;
  bound: any;

  public openedWindow: number;

  @ViewChild('AgmMap') agmMap: AgmMap;

  // public markers: Marker[] = this.locationService.getMarkers();

  constructor(
    private locationService: LocationsService,
    private mapApiLoader: MapsAPILoader,
    private mapsService: MapsService
  ) { }

  ngOnInit() {

    this.lat = this.mapsService.lat;
    this.lng = this.mapsService.lng;
    this.zoom = this.mapsService.zoom;

    this.setCurrentPosition();
    this.mapApiLoader.load();

    // Zoom to new location after search
    this.mapsService.newCoordinators.subscribe(
      (coords: { lat: number, lng: number, zoom: number }) => {
        if (coords) {
          this.lat = coords.lat;
          this.lng = coords.lng;
          this.zoom = coords.zoom;
          this.mapApiLoader.load();
        }
      }
    );

    // Open window after click on panel
    this.mapsService.openWindow.subscribe(
      index => {
        this.openedWindow = +index;
      }
    );

    this.locationService.getMarkers().subscribe(
      response => {
        this.markers = response.body['listStaffDetails'];
      },
    );
  }

  ngAfterViewInit() {
    console.log(this.agmMap);
    this.agmMap.mapReady.subscribe(map => {
      const bounds: LatLngBounds = new google.maps.LatLngBounds();
      for (const mm of this.markers) {
        bounds.extend(new google.maps.LatLng(mm.latitude, mm.longitude));
      }
      console.log(bounds);
      // map.fitBounds(bounds);
      this.bound = bounds;
    });
  }

  mapClicked($event: MouseEvent) {
    console.log($event);
  }

  clickedMarker(label: string, index: number) {
    console.log(`Clicked the marker: ${label || index}`);
    this.openedWindow = index;
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = this.mapsService.lat = position.coords.latitude;
        this.lng = this.mapsService.lng = position.coords.longitude;
        this.zoom = 10;
      });
    }

    // @Todo: resort the locations
  }

  isInfoWindowOpen(index: number) {
    return this.openedWindow === index;
  }
}