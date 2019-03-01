import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { Events } from '@ionic/angular';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private storage: Storage, private http: HTTP,private router: Router) {
  }

  getToken() {
    return this.storage.get('token');
  }

  getEmail() {
    return this.storage.get('email');
  }

  getIsAuthentication() {
    return this.storage.get('isAuthentication');
  }

  loginAuthenticate(email, isAuthentication, token) {
    this.storage.set("email", email);
    this.storage.set("isAuthentication", isAuthentication);
    this.storage.set("token", token);
  }

  logoutAuthenticate() {
    this.storage.set("email", "");
    this.storage.set("isAuthentication", false);
    this.storage.set("token", "");

    this.router.navigate(['/login']);
  }

  loginPassData(form) {
    let url = 'http://192.168.8.104:3003/api/auth/driver';
    return this.http.post(url, form, {});
  }
}