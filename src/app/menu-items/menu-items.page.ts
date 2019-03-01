import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.page.html',
  styleUrls: ['./menu-items.page.scss'],
})
export class MenuItemsPage implements OnInit {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Map',
      url: '/password-reset',
      icon: 'navigate'
    },
    {
      title: 'Payment',
      url: '/home',
      icon: 'cash'
    },
    {
      title: 'Profile',
      url: '/home',
      icon: 'person'
    },
    {
      title: 'Settings',
      url: '/home',
      icon: 'settings'
    },
    {
      title: 'QR Code',
      url: '/qr-code',
      icon: 'qr-scanner'
    }

  ];


  email: any;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.getEmail().then((value) => {
      if(!value)
        this.authService.logoutAuthenticate();

      this.email = value;
    }).catch(error => {
      console.log(error);
      this.authService.logoutAuthenticate();
    });
  }

  logout() {
    this.authService.logoutAuthenticate();
  }


}
