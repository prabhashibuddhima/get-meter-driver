import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {

  qrData: any;
  constructor(private userService: UserService, public alertController: AlertController) { }

  ngOnInit() {
    this.createCode();
  }


  createCode() {

    this.userService.qrCodeGenerator().then(res => {
      if (res.status === 200) {
        let data = JSON.parse(res.data);
        this.qrData = { firstName: data.firstName, lastName: data.lastName, nic: data.nic };
        this.qrData = JSON.stringify(this.qrData);
      } else {
        this.failureAlert();
      }

    })
      .catch(err => {
        //alert(JSON.stringify(err));
        this.failureAlert();
      });

  }

  async failureAlert() {
    const alert = await this.alertController.create({
      header: ' QR Code Generate Failed',

      message: 'Try Again!!',
      buttons: ['OK']
    });

    await alert.present();
  }
}
