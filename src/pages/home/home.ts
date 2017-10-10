import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;

//@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }

  ionViewDidLoad(){
    this.getPosition();
  }
  
  getPosition():any{
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response);
    })
    .catch(error => {
      console.log(error);
    })
  }

  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);

    //creando un nuevo mapa pasando HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    //creando latitud y longitud del objeto
    let myLatLng = {lat: latitude, lng: longitude};

    //mapa creado
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Aquí estoy!, en proceso desde github'
      });
      mapEle.classList.add('show-map');
    });
  }
}
