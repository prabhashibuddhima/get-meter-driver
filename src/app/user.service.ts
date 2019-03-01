import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

import { AlertController } from '@ionic/angular';

import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HTTP, public alertController: AlertController, private authenticationService: AuthenticationService) { }



  register(form) {
    return this.http.post('http://192.168.8.104:3003/api/drivers', form.value, {});
  }

  async qrCodeGenerator() {
    let iemail;
    await this.authenticationService.getEmail().then(email => {
      iemail = email;
    });

    let itoken;
    await this.authenticationService.getToken().then(token => {
      itoken = token;
    });

    return this.http.post('http://192.168.8.104:3003/api/drivers/qrcode', { "email": iemail }, { "Authorization": "Bearer " + itoken });

  }

}
