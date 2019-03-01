import { AuthenticationService } from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logform: FormGroup;

  constructor(private authService: AuthenticationService, public router: Router, public formBuilder: FormBuilder, public alertController: AlertController, private storage: Storage) {
    this.logform = formBuilder.group({

      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: ['', Validators.required]

    });
  }

  ngOnInit() {
  }

  loginform() {
    if (this.logform.invalid) {
      console.log(this.logform.value);
      this.presentAlert();

    }
    else {

      this.authService.loginPassData(this.logform.value).then(res => {

        if (res.status === 200) {
          let data = JSON.parse(res.data);
          this.authService.loginAuthenticate(this.logform.value.email, data.isAuthentication, data.token);
          this.successAlert();
          this.router.navigateByUrl('/home');
        } else {
          this.pwAlert();
        }
        this.logform.reset();      
      })
        .catch(err => {
          this.pwAlert();
          this.logform.reset();  
        });
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Empty Fields',
      message: 'Enter Required Fields!!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async successAlert() {
    const alert = await this.alertController.create({
      header: 'LogIn',

      message: 'Login Successfully!!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async pwAlert() {
    const alert = await this.alertController.create({
      header: 'Password Mismatched!!',

      message: 'Enter the email and password fields correctly!!',
      buttons: ['OK']
    });

    await alert.present();
  }


}
