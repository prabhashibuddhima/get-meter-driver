import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthenticationService } from '../services/authentication.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup } from '@angular/forms';
declare var google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  email: any;
  oneKmDefaultPrice: any;
  moreKmDefaultPrice: any;
  waitTimeDefaultPrice: any;

  moreKm: any;
  waitTime: any;
  tempWaitTime: any;

  oneKmPrice: any;
  moreKmPrice: any;
  waitTimePrice: any;

  totalKm: any;
  totalPrice: any;

  isHold: Boolean;
  holdStatus: any;

  startStatus: any;

  interval: any;

  service: any;

  originPoint: any;
  distanceValue: any;
  
  ngOnInit(){
    this.service = new google.maps.DistanceMatrixService();
   
  }

  constructor(private geolocation: Geolocation,private authService: AuthenticationService, private router: Router) {
    this.oneKmDefaultPrice = 50;
    this.moreKmDefaultPrice = 35;
    this.waitTimeDefaultPrice = 2;

    this.moreKm = 0;
    this.waitTime = new Date(0, 0, 0, 0, 0, 0, 0).setSeconds(0);
    this.tempWaitTime = 0;

    this.oneKmPrice = 0;
    this.moreKmPrice = 0;
    this.waitTimePrice = 0;

    this.totalKm = 0;
    this.totalPrice = 0;

    this.isHold = false;
    this.holdStatus = "Hold";

    this.startStatus = false;

    this.distanceValue = 0;

  }

  onStart() {
    this.startStatus = true;
    let watch = this.geolocation.watchPosition({ maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
    watch.subscribe((data) => {

      if (!this.originPoint) {
        this.originPoint = data.coords;
      } else {
        this.service.getDistanceMatrix(
          {
            origins: [{lat: this.originPoint.latitude, lng: this.originPoint.longitude}],
            destinations: [{lat: data.coords.latitude, lng: data.coords.longitude}],
            travelMode: 'DRIVING',
            avoidHighways: true,
            avoidTolls: true,
          }, this.distanceCallback);
      }
    });

    this.oneKmPrice = this.oneKmDefaultPrice;
    this.totalPrice = this.oneKmPrice;

  }

 

  onHold() {
    this.isHold = !this.isHold;

    if (this.isHold) {
      this.holdStatus = "Unhold";

      this.interval = setInterval(() => {
        this.tempWaitTime = this.tempWaitTime + 1;
        let d = new Date(0, 0, 0, 0, 0, 0, 0);
        this.waitTime = d.setSeconds(this.tempWaitTime);
        this.waitTimePrice = this.tempWaitTime * (this.waitTimeDefaultPrice / 60);
        this.totalPrice = this.totalPrice + (this.waitTimeDefaultPrice / 60);
      }, 1000);

    } else {
      this.holdStatus = "Hold";
      clearInterval(this.interval);
    }

  }

  distanceCallback(response, status) {
    if(status === 'OK'){
      console.log(response.rows[0].elements[0].distance.text);

      let dValue = response.rows[0].elements[0].distance.value;
      let dText = response.rows[0].elements[0].distance.text;

      if(dValue > 1000) {
        this.moreKm = (dValue-1000)/1000 + ' km';

        this.moreKmPrice = ((dValue - 1000)/1000) * this.moreKmDefaultPrice;
        this.totalPrice = this.oneKmPrice + this.moreKmPrice + this.waitTimePrice;
      }

      this.totalKm = dText;

    }

  }

  
  onStop() {
    clearInterval(this.interval);

    const navigationExtras: NavigationExtras = {
      queryParams: {
        "totalKm": this.totalKm,
        "waitTime": this.waitTime,
        "totalPrice": this.totalPrice

      }
    };
    this.router.navigate(['trip-complete'], navigationExtras);
  }

  


  


}
