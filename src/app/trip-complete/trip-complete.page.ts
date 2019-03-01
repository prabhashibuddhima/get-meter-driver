import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ActionSheetController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-trip-complete',
  templateUrl: './trip-complete.page.html',
  styleUrls: ['./trip-complete.page.scss'],
})


export class TripCompletePage implements OnInit {

  totalKm: any;
  waitTime: any;
  totalPrice: any;
  // set up hardware back button event.
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  constructor(private activatedRoute: ActivatedRoute, private nav: NavController, private platform: Platform, private actionSheetCtrl: ActionSheetController, ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.totalKm = params['totalKm'];
      this.waitTime = params['waitTime'];
      this.totalPrice = params['totalPrice'];
    });
    // Initialize BackButton Eevent.
    //this.backButtonEvent();

  }

  ngOnInit() {
  }
  

}
