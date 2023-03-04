import { Component } from '@angular/core';
import * as Leaflet from 'leaflet'; 


export interface location{
  city: string;
  country: string;
  geonameId: number,
  lat: number,
  lng: number,
  postalCode: string;
  region: string;
  timezone: string;
  ip: string,
	isp: string,
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(){} 
   /** Leaft map */  
   map!: Leaflet.Map;
   markers: Leaflet.Marker[] = [];
   options = {
     layers: [
       Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         
       })
     ],
     zoom: 16,
     center: { lat: 28.626137, lng: 79.821603 }
   }
 
   initMarkers() {
     const initialMarkers = [
       {
         position: { lat: 28.625485, lng: 79.821091 },
         draggable: true
       },
       {
         position: { lat: 28.625293, lng: 79.817926 },
         draggable: false
       },
       {
         position: { lat: 28.625182, lng: 79.81464 },
         draggable: true
       }
     ];
     for (let index = 0; index < initialMarkers.length; index++) {
       const data = initialMarkers[index];
       const marker = this.generateMarker(data, index);
       marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
       this.map.panTo(data.position);
       this.markers.push(marker)
     }
   }
 
   generateMarker(data: any, index: number) {
     return Leaflet.marker(data.position, { draggable: data.draggable })
       .on('click', (event) => this.markerClicked(event, index))
       .on('dragend', (event) => this.markerDragEnd(event, index));
   }
 
   onMapReady($event: Leaflet.Map) {
     this.map = $event;
     this.initMarkers();
   }
 
   mapClicked($event: any) {
     console.log($event.latlng.lat, $event.latlng.lng);
   }
 
   markerClicked($event: any, index: number) {
     console.log($event.latlng.lat, $event.latlng.lng);
   }
 
   markerDragEnd($event: any, index: number) {
     console.log($event.target.getLatLng());
   } 
/*json*/
public location =
[{
  ip: "8.8.8.8",
  isp: "Google LLC",
  city: "Mountain View",
  country: "US",
  geonameId: 5375480,
  lat: 37.38605,
  lng: -122.08385,
  postalCode: "94035",
  region: "California",
  timezone: "-08:00"
}] 
  
}



